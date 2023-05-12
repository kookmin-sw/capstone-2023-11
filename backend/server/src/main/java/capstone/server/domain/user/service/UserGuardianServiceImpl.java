package capstone.server.domain.user.service;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.user.dto.GetDailySummaryDto;
import capstone.server.domain.user.dto.GetUserWardMainInfoResponseDto;
import capstone.server.domain.user.dto.GetWeeklySummaryDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserGuardianServiceImpl implements UserGuardianService {

    private final UserService userService;
    @Override
    public GetUserWardMainInfoResponseDto getUserWardMainInfo(Long userWardKakaoAccountId) {
        KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoAccountIdAndUserType.builder()
                .userType("ward")
                .kakaoAccountId(userWardKakaoAccountId)
                .build();

        return userService.getUserWardMainInfo(kaKaoAccountIdAndUserType);
    }

    @Override
    public GetDailySummaryDto getDailySummary(Long userWardKakaoAccountId) {
        KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoAccountIdAndUserType.builder()
                .userType("ward")
                .kakaoAccountId(userWardKakaoAccountId)
                .build();

        return userService.getDailySummary(kaKaoAccountIdAndUserType);
    }

    @Override
    public GetWeeklySummaryDto getWeeklySummary(Long userWardKakaoAccountId) {
        KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoAccountIdAndUserType.builder()
                .userType("ward")
                .kakaoAccountId(userWardKakaoAccountId)
                .build();

        return userService.getWeeklySummary(kaKaoAccountIdAndUserType);
    }
}
