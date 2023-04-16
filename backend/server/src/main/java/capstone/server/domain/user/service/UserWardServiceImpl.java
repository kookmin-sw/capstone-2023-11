package capstone.server.domain.user.service;

import capstone.server.domain.food.repository.MealRepository;
import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.medicine.repository.MedicineRepository;
import capstone.server.domain.user.dto.GetUserWardMainInfoResponseDto;
import capstone.server.domain.user.repository.UserWardRepository;
import capstone.server.domain.workout.repository.WorkOutCategoryUserWardHasRepository;
import capstone.server.entity.UserWard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

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
    public GetUserWardMainInfoResponseDto getUserWardMainInfo(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType) {
        UserWard userWard = userWardRepository.findUserWardByKakaoAccountId(kaKaoAccountIdAndUserType.getKakaoAccountId()).get();

        Long todayMealCount = mealRepository.countByUserWardAndCreatedAtAfter(userWard, LocalDateTime.now().with(LocalDateTime.MIN));
        Long todayWorkOutCount = workOutCategoryUserWardHasRepository.countByUserWardAndCreatedAtAfter(userWard, LocalDateTime.now().with(LocalDateTime.MIN));

    }
}
