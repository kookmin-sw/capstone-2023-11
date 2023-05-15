package capstone.server.domain.user.service;

import capstone.server.domain.food.dto.FoodInfo;
import capstone.server.domain.food.repository.FoodRepository;
import capstone.server.domain.food.repository.MealRepository;
import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.login.enums.MedicalCategory;
import capstone.server.domain.medical.dto.MedicalHistoryInfo;
import capstone.server.domain.medical.repository.MedicalHistoryCategoryRepository;
import capstone.server.domain.medical.repository.MedicalHistoryUserWardHasRepository;
import capstone.server.domain.medicine.dto.ResponseMedicineInfo;
import capstone.server.domain.medicine.repository.MedicineRepository;
import capstone.server.domain.user.dto.*;
import capstone.server.domain.user.repository.UserWardRepository;
import capstone.server.domain.workout.repository.WorkOutCategoryUserWardHasRepository;
import capstone.server.entity.*;
import capstone.server.utils.DateTimeUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{

    private final UserWardRepository userWardRepository;
    private final WorkOutCategoryUserWardHasRepository workOutCategoryUserWardHasRepository;
    private final MedicineRepository medicineRepository;
    private final MealRepository mealRepository;
    private final FoodRepository foodRepository;
    private final MedicalHistoryUserWardHasRepository medicalHistoryUserWardHasRepository;

    public GetUserWardMainInfoResponseDto getUserWardMainInfo(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType) throws HttpClientErrorException {
        UserWard userWard = userWardRepository.findUserWardByKakaoAccountId(kaKaoAccountIdAndUserType.getKakaoAccountId()).get();

        // 오늘 식사 입력 횟수
        int todayMealCount = mealRepository.countByUserWardAndCreatedAtAfter(userWard, LocalDateTime.now().with(LocalTime.MIN));
        // 오늘 운동 입력 횟수
        int todayWorkOutCount = workOutCategoryUserWardHasRepository.countByUserWardAndCreatedAtAfter(userWard, LocalDateTime.now().with(LocalTime.MIN));
        LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).with(LocalTime.MIN);
        LocalDateTime endOfMonth = LocalDateTime.now().with(TemporalAdjusters.lastDayOfMonth()).with(LocalTime.MAX);
        // 이번달 입력 횟수 (운동 + 식사)
        int monthRecordCount = mealRepository.countByUserWardAndCreatedAtBetween(userWard, startOfMonth, endOfMonth) + workOutCategoryUserWardHasRepository.countByUserWardAndCreatedAtBetween(userWard, startOfMonth, endOfMonth);

        // 질병 목록
        List<MedicalHistoryCategory> medicalHistoryCategories = medicalHistoryUserWardHasRepository.findAllByUserWardUserId(userWard.getUserId());

        GetUserWardMainInfoResponseDto response = GetUserWardMainInfoResponseDto.builder()
                .userCode(kaKaoAccountIdAndUserType.getKakaoAccountId())
                .userName(userWard.getName())
                .gender(userWard.getGender())
                .height(userWard.getHeight())
                .weight(userWard.getWeight())
                .birthday(userWard.getBirthday())
                .drinkings(userWard.getDrinkings())
                .smoke(userWard.getSmoke())
                .age(LocalDate.now().getYear() - userWard.getBirthday().getYear())
                .ills(medicalHistoryCategories)
                .medicineInfoList(new ArrayList<>())
                .monthRecordCount(monthRecordCount)
                .todayMealCount(todayMealCount)
                .todayWorkOutCount(todayWorkOutCount)
                .build();


        List<Medicine> medicineList = medicineRepository.findAllByUserWardUserId(userWard.getUserId());

        for (Medicine medicine : medicineList) {
            int remainDay = DateTimeUtils.getDaysBetween(LocalDateTime.now(), medicine.getDueAt());
            if (remainDay < 0) {
                continue;
            }

            response.getMedicineInfoList().add(ResponseMedicineInfo.builder()
                    .id(medicine.getId())
                    .name(medicine.getName())
                    .companyName(medicine.getCompanyName())
                    .caution(medicine.getCaution())
                    .useMethod(medicine.getUseMethod())
                    .depositMethod(medicine.getDepositMethod())
                    .effect(medicine.getEffect())
                    .imageUrl(medicine.getImageUrl())
                    .createdAt(medicine.getCreatedAt())
                    .dueAt(medicine.getDueAt())
                    .remainDay((remainDay))
                    .breakfast(medicine.getBreakfast())
                    .lunch(medicine.getLunch())
                    .dinner(medicine.getDinner())
                    .build());
        }

        return response;
    }

    @Override
    public GetDailySummaryDto getDailySummary(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType) throws HttpClientErrorException{
        UserWard userWard = userWardRepository.findUserWardByKakaoAccountId(kaKaoAccountIdAndUserType.getKakaoAccountId()).orElse(null);

        // 오늘 00:00:00 부터 23:59:59까지 범위 설정
        LocalDateTime startDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        LocalDateTime lastDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);

        // 오늘 식사 기록만 찾기
        List<Meal> mealList = mealRepository.findAllByUserWardUserIdAndCreatedAtBetweenOrderByCreatedAtDesc(userWard.getUserId(), startDateTime, lastDateTime);
        // 오늘 운동 기록만 찾기
        List<WorkOutUserWardHas> workOutRecords = workOutCategoryUserWardHasRepository.findAllByUserWardAndCreatedAtBetweenOrderByCreatedAtDesc(userWard, startDateTime, lastDateTime);

        GetDailySummaryDto getDailySummaryDto = GetDailySummaryDto.builder()
                .meal(new ArrayList<>())
                .exercise(new ArrayList<>())
                .build();

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
            getDailySummaryDto.getMeal().add(MealInfo.builder()
                    .id(meal.getId())
                    .createdAt(meal.getCreatedAt().toLocalTime().withSecond(0).withNano(0))
                    .times(meal.getTimes())
                    .imageUrl(meal.getImage().getUrl())
                    .detail(details).build());
        }

        for (WorkOutUserWardHas workOutRecord : workOutRecords) {

            getDailySummaryDto.getExercise().add(ExerciseInfo.builder()
                    .id(workOutRecord.getId())
                    .kor(workOutRecord.getWorkOutCategory().getKor())
                    .eng(workOutRecord.getWorkOutCategory().getEng())
                    .type(workOutRecord.getWorkOutCategory().getName())
                    .kcal(workOutRecord.getKcal())
                    .hour(workOutRecord.getHour())
                    .createdAt(workOutRecord.getCreatedAt().toLocalTime().withSecond(0).withNano(0))
                    .build());
        }

        return getDailySummaryDto;

    }

    @Override
    public GetWeeklySummaryDto getWeeklySummary(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType) throws HttpClientErrorException{
        UserWard userWard = userWardRepository.findUserWardByKakaoAccountId(kaKaoAccountIdAndUserType.getKakaoAccountId()).orElse(null);

        // 오늘을 기준으로 어제부터 7일동안의 범위 설정
        LocalDateTime startDateTime = LocalDateTime.of(LocalDate.now().minusDays(7), LocalTime.MIN); // 오늘로부터 7일전
        LocalDateTime lastDateTime = LocalDateTime.of(LocalDate.now().minusDays(1), LocalTime.MAX); // 어제

        //보유 질병 목록 저장
        List<MedicalHistoryCategory> medicalHistoryCategories = medicalHistoryUserWardHasRepository.findAllByUserWardUserId(userWard.getUserId());
        //Dto로 변경
        List<MedicalHistoryInfo> medicalHistoryInfos = medicalHistoryCategories.stream().map(medicalHistoryCategory -> medicalHistoryCategory.toDto()).collect(Collectors.toList());

        GetWeeklySummaryDto getWeeklySummaryDto = GetWeeklySummaryDto.builder()
                .name(userWard.getName())
                .gender(userWard.getGender().name())
                .age(LocalDate.now().getYear() - userWard.getBirthday().getYear())
                .drinkings(userWard.getDrinkings())
                .smoke(userWard.getSmoke())
                .height(userWard.getHeight())
                .weight(userWard.getWeight())
                .medicalHistory(medicalHistoryInfos)
                .weeklyFoodNutrientSum(new ArrayList<>(7))
                .weeklyExerciseInfo(new ArrayList<>(7))
                .build();

        List<Meal> mealList = mealRepository.findAllByUserWardUserIdAndCreatedAtBetweenOrderByCreatedAtAsc(userWard.getUserId(), startDateTime, lastDateTime);
        List<WorkOutUserWardHas> workOutRecords = workOutCategoryUserWardHasRepository.findAllByUserWardAndCreatedAtBetweenOrderByCreatedAtAsc(userWard, startDateTime, lastDateTime);
        // 일일 영양소 총합 계산.
        {
            LocalDate begin = startDateTime.toLocalDate();

            int mealIdx = 0;

            for (int i = 0; i < 7; i++) {
                LocalDate date = begin.plusDays(i);
                WeeklyFoodNutrient nutrientSum = new WeeklyFoodNutrient(date);
                getWeeklySummaryDto.getWeeklyFoodNutrientSum().add(nutrientSum);
                for (int j = mealIdx; j < mealList.size(); j++) {
                    if (!mealList.get(j).getCreatedAt().toLocalDate().isEqual(date)) {
                        mealIdx = j;
                        break;
                    }

                    List<Food> foods = foodRepository.findAllByMealId(mealList.get(j).getId());
                    for (Food food : foods) {
                        nutrientSum.plus(
                                food.getCalorie(), food.getCarbohyborateTotal(), food.getProtein(), food.getFatTotal(), food.getCholesterol(), food.getNatrium()
                        );
                    }
                }

            }
        }

        //일일 운동 칼로리 계산
        {
            LocalDate begin = startDateTime.toLocalDate();

            int workOutIdx = 0;

            for (int i = 0; i < 7; i++) {
                LocalDate date = begin.plusDays(i);
                WeeklyExerciseRecord exerciseSum = new WeeklyExerciseRecord(date);
                getWeeklySummaryDto.getWeeklyExerciseInfo().add(exerciseSum);
                for (int j = workOutIdx; j < workOutRecords.size(); j++) {
                    if (!workOutRecords.get(j).getCreatedAt().toLocalDate().isEqual(date)) {
                        workOutIdx = j;
                        break;
                    }

                    exerciseSum.plus(workOutRecords.get(j).getKcal(), workOutRecords.get(j).getHour());
                }

            }
        }








        return getWeeklySummaryDto;
    }
}
