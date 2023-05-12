package capstone.server.domain.user.service;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.user.dto.ConnectedWard;
import capstone.server.domain.user.dto.GetDailySummaryDto;
import capstone.server.domain.user.dto.GetUserWardMainInfoResponseDto;
import capstone.server.domain.user.dto.GetWeeklySummaryDto;
import capstone.server.domain.user.repository.UserGuardianRepository;
import capstone.server.entity.UserGuardian;
import capstone.server.entity.UserWard;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserGuardianServiceImpl implements UserGuardianService {

    private final UserService userService;
    private final UserGuardianRepository userGuardianRepository;
    @Override
    public GetUserWardMainInfoResponseDto getUserWardMainInfo(Long userWardKakaoAccountId) throws HttpClientErrorException {
        KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoAccountIdAndUserType.builder()
                .userType("ward")
                .kakaoAccountId(userWardKakaoAccountId)
                .build();

        return userService.getUserWardMainInfo(kaKaoAccountIdAndUserType);
    }

    @Override
    public GetDailySummaryDto getDailySummary(Long userWardKakaoAccountId) throws HttpClientErrorException {
        KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoAccountIdAndUserType.builder()
                .userType("ward")
                .kakaoAccountId(userWardKakaoAccountId)
                .build();

        return userService.getDailySummary(kaKaoAccountIdAndUserType);
    }

    @Override
    public GetWeeklySummaryDto getWeeklySummary(Long userWardKakaoAccountId) throws HttpClientErrorException {
        KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoAccountIdAndUserType.builder()
                .userType("ward")
                .kakaoAccountId(userWardKakaoAccountId)
                .build();

        return userService.getWeeklySummary(kaKaoAccountIdAndUserType);
    }

    @Override
    public List<ConnectedWard> getConnectedWards(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType) throws HttpClientErrorException {
        UserGuardian userGuardian = userGuardianRepository.findUserGuardianByKakaoAccountId(kaKaoAccountIdAndUserType.getKakaoAccountId()).get();

        // 유저가디언과 연결된 유저와드들의 정보를 모두 가져온다.
        List<UserWard> connectedWards = userGuardianRepository.findUserWardByUserGuardianUserId(userGuardian.getUserId());

        List<ConnectedWard> result = new ArrayList<>();

        for (UserWard userWard : connectedWards) {
            result.add(
                    ConnectedWard.builder()
                            .name(userWard.getName())
                            .email(userWard.getEmail())
                            .birthday(userWard.getBirthday())
                            .age(LocalDate.now().getYear() - userWard.getBirthday().getYear())
                            .weight(userWard.getWeight())
                            .height(userWard.getHeight())
                            .smoke(userWard.getSmoke())
                            .drinkings(userWard.getDrinkings())
                            .kakaoAccountId(userWard.getKakaoAccountId())
                            .gender(userWard.getGender().name())
                            .build()
            );
        }

        return result;

    }


}
