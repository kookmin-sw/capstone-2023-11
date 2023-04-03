package capstone.server.domain.food.service;

import capstone.server.domain.food.dto.FoodDetectionResponseDto;
import capstone.server.domain.food.dto.RegisterFoodDto;
import capstone.server.domain.food.repository.MealRepository;
import capstone.server.domain.user.repository.UserWardRepository;
import capstone.server.entity.Meal;
import capstone.server.entity.UserWard;
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
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
@Service
@Slf4j
public class FoodServiceImpl implements FoodService{

    @Autowired
    private MealRepository mealRepository;
    @Autowired
    private UserWardRepository userWardRepository;
    @Value("${kakao.food-detection.url}")
    private String FOOD_DETECTION_API_URL;
    @Value("${kakao.food-detection.key}")
    private String FOOD_DETECTION_API_KEY;
    @Override
    public FoodDetectionResponseDto detectFoodImage(MultipartFile image) throws HttpClientErrorException {
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
    public ResponseEntity registerFood(Long kakaoAccountId, RegisterFoodDto food) {
        UserWard userWard = userWardRepository.findUserWardByKakaoAccountId(kakaoAccountId).orElse(null);
        Meal nowMeal = Meal.builder().userWard(userWard).build();
        nowMeal.getCreatedAt();

        Meal prevData = mealRepository.findTopByOrderByCreatedAtDesc();
//        if (prevData == null || !)

        return null;
    }
}
