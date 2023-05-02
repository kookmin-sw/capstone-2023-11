package capstone.server.domain.user.service;

import capstone.server.domain.food.repository.MealRepository;
import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.medicine.dto.ResponseMedicineInfo;
import capstone.server.domain.medicine.repository.MedicineRepository;
import capstone.server.domain.user.dto.GetUserWardMainInfoResponseDto;
import capstone.server.domain.user.repository.UserWardRepository;
import capstone.server.domain.workout.repository.WorkOutCategoryUserWardHasRepository;
import capstone.server.entity.Medicine;
import capstone.server.entity.UserWard;
import capstone.server.utils.DateTimeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjuster;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserWardServiceImpl implements UserWardService{
    @Autowired
    UserWardRepository userWardRepository;
    @Autowired
    WorkOutCategoryUserWardHasRepository workOutCategoryUserWardHasRepository;
    @Autowired
    MedicineRepository medicineRepository;
    @Autowired
    MealRepository mealRepository;
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

        GetUserWardMainInfoResponseDto response = GetUserWardMainInfoResponseDto.builder()
                .userCode(kaKaoAccountIdAndUserType.getKakaoAccountId())
                .userName(userWard.getName())
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
}