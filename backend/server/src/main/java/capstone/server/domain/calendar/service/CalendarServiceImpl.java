package capstone.server.domain.calendar.service;


import capstone.server.domain.calendar.dto.GetRecordsDateResponseDto;
import capstone.server.domain.food.repository.MealRepository;
import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.user.repository.UserWardRepository;
import capstone.server.domain.workout.repository.WorkOutCategoryUserWardHasRepository;
import capstone.server.entity.UserWard;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService{


    private final UserWardRepository userWardRepository;

    private final WorkOutCategoryUserWardHasRepository workOutCategoryUserWardHasRepository;

    private final MealRepository mealRepository;
    @Override
    public GetRecordsDateResponseDto getRecordsDate(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType) throws HttpClientErrorException {
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
