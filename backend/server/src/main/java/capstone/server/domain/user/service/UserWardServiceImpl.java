package capstone.server.domain.user.service;

import capstone.server.domain.login.enums.MedicalCategory;
import capstone.server.domain.medical.repository.MedicalHistoryCategoryRepository;
import capstone.server.domain.medical.repository.MedicalHistoryUserWardHasRepository;
import capstone.server.domain.user.dto.*;
import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.user.repository.UserWardRepository;
import capstone.server.entity.MedicalHistoryCategory;
import capstone.server.entity.MedicalHistoryUserWardHas;
import capstone.server.entity.UserWard;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDate;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UserWardServiceImpl implements UserWardService{
    private final UserService userService;
    private final UserWardRepository userWardRepository;
    private final MedicalHistoryUserWardHasRepository medicalHistoryUserWardHasRepository;
    private final MedicalHistoryCategoryRepository medicalHistoryCategoryRepository;

    public GetUserWardMainInfoResponseDto getUserWardMainInfo(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType) throws HttpClientErrorException {
        return userService.getUserWardMainInfo(kaKaoAccountIdAndUserType);
    }
    public GetDailySummaryDto getDailySummary(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType) throws HttpClientErrorException {
        return userService.getDailySummary(kaKaoAccountIdAndUserType);
    }
    public GetWeeklySummaryDto getWeeklySummary(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType) throws HttpClientErrorException {
        return userService.getWeeklySummary(kaKaoAccountIdAndUserType);
    }
    @Override
    public String modifyUserWardInfo(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, UserWardInfoDto userWardInfoDto) {
        UserWard userWard = userWardRepository.findUserWardByKakaoAccountId(kaKaoAccountIdAndUserType.getKakaoAccountId()).get();

        UserWard modifiedUserWard = UserWard.builder()
                .userId(userWard.getUserId())
                .name(userWard.getName())
                .kakaoAccountId(userWard.getKakaoAccountId())
                .birthday(LocalDate.of(userWardInfoDto.getYear(), userWardInfoDto.getMonth(), userWardInfoDto.getDay()))
                .gender(userWardInfoDto.getGenderType())
                .weight(userWardInfoDto.getWeight())
                .height(userWardInfoDto.getHeight())
                .drinkings(userWardInfoDto.getDrinkings())
                .smoke(userWardInfoDto.getSmoke())
                .email(userWard.getEmail())
                .build();

        userWardRepository.save(modifiedUserWard);

        // 기존 질병태그 모두 삭제.
        medicalHistoryUserWardHasRepository.deleteAllByUserWard(userWard);

        for (MedicalCategory ill : userWardInfoDto.getIlls()) { // 질병 태그 등록
            MedicalHistoryCategory medicalHistoryCategory = medicalHistoryCategoryRepository.findMedicalHistoryCategoryByName(ill).get();
            medicalHistoryUserWardHasRepository.save(
                    MedicalHistoryUserWardHas.builder()
                            .medicalHistoryCategory(medicalHistoryCategory)
                            .userWard(modifiedUserWard)
                            .build()
            );
        }

        return "회원정보가 정상적으로 수정되었습니다.";
    }

}
