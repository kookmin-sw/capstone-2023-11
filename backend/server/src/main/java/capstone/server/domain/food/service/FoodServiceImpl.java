package capstone.server.domain.food.service;

import capstone.server.domain.food.dto.*;
import capstone.server.domain.food.repository.FoodRepository;
import capstone.server.domain.food.repository.MealRepository;
import capstone.server.domain.image.repository.ImageRepository;
import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.notification.dto.MealInfoMailDto;
import capstone.server.domain.notification.service.NotificationService;
import capstone.server.domain.user.repository.UserWardRepository;
import capstone.server.entity.Food;
import capstone.server.entity.Image;
import capstone.server.entity.Meal;
import capstone.server.entity.UserWard;
import capstone.server.utils.S3Util;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class FoodServiceImpl implements FoodService{

    @Autowired
    private MealRepository mealRepository;
    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private UserWardRepository userWardRepository;
    @Autowired
    private NotificationService notificationService;

    @Autowired
    private S3Util s3Util;

    @Value("${kakao.food-detection.url}")
    private String FOOD_DETECTION_API_URL;
    @Value("${kakao.food-detection.key}")
    private String FOOD_DETECTION_API_KEY;
    @Override
    public FoodDetectionResponseDto detectFoodImage(MultipartFile image) throws HttpClientErrorException, IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.set("x-api-key", FOOD_DETECTION_API_KEY);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        body.add("image", image.getResource());

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<FoodDetectionResponseDto> response;
        response = restTemplate.postForEntity(FOOD_DETECTION_API_URL, requestEntity, FoodDetectionResponseDto.class);
        log.info(response.getBody().toString());
        return response.getBody();
    }

    @Override
    public String registerFood(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, MultipartFile image, RegisterFoodDto registerFoodDto) throws IOException {
        UserWard userWard = userWardRepository.findUserWardByKakaoAccountId(kaKaoAccountIdAndUserType.getKakaoAccountId()).orElse(null);
        int times = 0;
        Meal prevData = mealRepository.findTopByUserWardUserIdOrderByCreatedAtDesc(userWard.getUserId());
        if (prevData == null || prevData.getCreatedAt().toLocalDate().compareTo(LocalDate.now()) != 0) {
            times = 1;
        } else {
            times = prevData.getTimes() + 1;
        }

        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String title = "meal_"+String.format("%08d_", userWard.getUserId()) + now + ".jpg";

        String url = s3Util.uploadFile(image, title);

        log.info(title);
        log.info(url);

        //mail에 전송하기 위한 객체
        MealInfoMailDto mealInfoMailDto = MealInfoMailDto.builder()
                .dateTime(LocalDateTime.now())
                .times(times)
                .imageUrl(url)
                .details(new ArrayList<>())
                .wardId(userWard.getUserId())
                .build();

        // S3에 업로드한 이미지 DB에 저장
        Image savedImage = Image.builder()
                .title(title)
                .url(url).build();
        imageRepository.save(savedImage);

        log.info(String.valueOf(savedImage));

        Meal meal = Meal.builder().userWard(userWard).times(times).image(savedImage).build();


        mealRepository.save(meal);
        log.info(String.valueOf(meal));

        for (FoodInfo info : registerFoodDto.getFood()) {
            Food food = Food.builder()
                    .calorie(info.getCalorie())
                    .carbohyborateTotal(info.getCarbohyborateTotal())
                    .carbohyborateSugar(info.getCarbohyborateSugar())
                    .carbohyborateDietaryFiber(info.getCarbohyborateDietaryFiber())
                    .fatTotal(info.getFatTotal())
                    .fatSaturatedfat(info.getFatSaturatedfat())
                    .fatTransFat(info.getFatTransFat())
                    .cholesterol(info.getCholesterol())
                    .protein(info.getProtein())
                    .natrium(info.getNatrium())
                    .name(info.getName())
                    .servingSize(info.getServingSize())
                    .meal(meal).build();

            // MailDto에 음식 상세정보 추가
            mealInfoMailDto.getDetails().add(info);

            foodRepository.save(food);
        }

        notificationService.sendFoodMail(mealInfoMailDto);

        return "식사 등록에 성공하였습니다.";
    }

    @Override
    public GetFoodInfoResponseDto getFoodInfo(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType) {
        UserWard userWard = userWardRepository.findUserWardByKakaoAccountId(kaKaoAccountIdAndUserType.getKakaoAccountId()).orElse(null);

        List<Meal> mealList = mealRepository.findAllByUserWardUserIdOrderByCreatedAtDesc(userWard.getUserId());
        if (mealList == null) {
            throw new RuntimeException("해당 유저에 대한 식사정보가 없습니다.");
        }

        GetFoodInfoResponseDto getFoodInfoResponseDto = GetFoodInfoResponseDto.builder().mealInfos(new ArrayList<>()).build();
        for (Meal meal : mealList) {
            List<Food> foods = foodRepository.findAllByMealId(meal.getId());
            List<FoodInfo> details = new ArrayList<>();
            for (Food food : foods) {
                details.add(FoodInfo.builder()
                        .calorie(food.getCalorie())
                        .carbohyborateTotal(food.getCarbohyborateTotal())
                        .carbohyborateSugar(food.getCarbohyborateSugar())
                        .carbohyborateDietaryFiber(food.getCarbohyborateDietaryFiber())
                        .fatTotal(food.getFatTotal())
                        .fatSaturatedfat(food.getFatSaturatedfat())
                        .fatTransFat(food.getFatTransFat())
                        .cholesterol(food.getCholesterol())
                        .protein(food.getProtein())
                        .natrium(food.getNatrium())
                        .name(food.getName())
                        .servingSize(food.getServingSize()).build());
            }
            getFoodInfoResponseDto.getMealInfos().add(MealInfo.builder()
                    .id(meal.getId())
                    .dateTime(meal.getCreatedAt())
                    .times(meal.getTimes())
                    .imageUrl(meal.getImage().getUrl())
                    .detail(details).build());
        }

        return getFoodInfoResponseDto;
    }

    @Override
    public GetFoodInfoResponseDto getFoodInfoByYearMonth(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, LocalDateTime startDate, LocalDateTime lastDate) {
        UserWard userWard = userWardRepository.findUserWardByKakaoAccountId(kaKaoAccountIdAndUserType.getKakaoAccountId()).orElse(null);

        List<Meal> mealList = mealRepository.findAllByUserWardUserIdAndCreatedAtBetweenOrderByCreatedAtDesc(userWard.getUserId(), startDate, lastDate);
        if (mealList == null) {
            throw new RuntimeException("해당 유저에 대한 식사정보가 없습니다.");
        }

        GetFoodInfoResponseDto getFoodInfoResponseDto = GetFoodInfoResponseDto.builder().mealInfos(new ArrayList<>()).build();
        for (Meal meal : mealList) {
            List<Food> foods = foodRepository.findAllByMealId(meal.getId());
            List<FoodInfo> details = new ArrayList<>();
            for (Food food : foods) {
                details.add(FoodInfo.builder()
                        .calorie(food.getCalorie())
                        .carbohyborateTotal(food.getCarbohyborateTotal())
                        .carbohyborateSugar(food.getCarbohyborateSugar())
                        .carbohyborateDietaryFiber(food.getCarbohyborateDietaryFiber())
                        .fatTotal(food.getFatTotal())
                        .fatSaturatedfat(food.getFatSaturatedfat())
                        .fatTransFat(food.getFatTransFat())
                        .cholesterol(food.getCholesterol())
                        .protein(food.getProtein())
                        .natrium(food.getNatrium())
                        .name(food.getName())
                        .servingSize(food.getServingSize()).build());
            }
            getFoodInfoResponseDto.getMealInfos().add(MealInfo.builder()
                    .id(meal.getId())
                    .dateTime(meal.getCreatedAt())
                    .times(meal.getTimes())
                    .imageUrl(meal.getImage().getUrl())
                    .detail(details).build());
        }

        return getFoodInfoResponseDto;
    }

    @Override
    public String deleteMeal(Long mealId) {
        mealRepository.deleteById(mealId);
        return mealId + "번 식사 삭제에 성공하였습니다.";
    }
}
