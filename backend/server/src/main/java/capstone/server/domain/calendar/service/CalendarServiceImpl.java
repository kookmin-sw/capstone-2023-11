package capstone.server.domain.calendar.service;


import capstone.server.domain.calendar.dto.GetRecordsDateResponseDto;
import capstone.server.domain.food.repository.MealRepository;
import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.user.repository.UserWardRepository;
import capstone.server.domain.workout.repository.WorkOutCategoryUserWardHasRepository;
import capstone.server.entity.UserWard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class CalendarServiceImpl implements CalendarService{

    @Autowired
    UserWardRepository userWardRepository;
    @Autowired
    WorkOutCategoryUserWardHasRepository workOutCategoryUserWardHasRepository;
    @Autowired
    MealRepository mealRepository;
    @Override
    @Transactional
    public GetRecordsDateResponseDto getRecordsDate(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType) {
        UserWard userWard = userWardRepository.findUserWardByKakaoAccountId(kaKaoAccountIdAndUserType.getKakaoAccountId()).get();
        List<LocalDate> mealRecordDate = mealRepository.findDistinctCreatedAtByUserWard(userWard);
        List<LocalDate> workOutRecordDate = workOutCategoryUserWardHasRepository.findDistinctCreatedAtByUserWard(userWard);

        GetRecordsDateResponseDto response = GetRecordsDateResponseDto.builder()
                .MealRecordDate(mealRecordDate)
                .WorkOutRecordDate(workOutRecordDate)
                .build();

        return response;
    }
}
