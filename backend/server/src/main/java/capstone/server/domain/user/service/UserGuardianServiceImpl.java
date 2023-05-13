package capstone.server.domain.user.service;

import capstone.server.domain.food.dto.GetFoodInfoResponseDto;
import capstone.server.domain.food.service.FoodService;
import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.user.dto.ConnectedWard;
import capstone.server.domain.user.dto.GetDailySummaryDto;
import capstone.server.domain.user.dto.GetUserWardMainInfoResponseDto;
import capstone.server.domain.user.dto.GetWeeklySummaryDto;
import capstone.server.domain.user.exception.DuplicateUserConnectException;
import capstone.server.domain.user.repository.UserGuardianRepository;
import capstone.server.domain.user.repository.UserGuardianUserWardRepository;
import capstone.server.domain.user.repository.UserWardRepository;
import capstone.server.domain.workout.dto.WorkOutRecordResponse;
import capstone.server.domain.workout.service.WorkOutService;
import capstone.server.entity.UserGuardian;
import capstone.server.entity.UserGuardianUserWard;
import capstone.server.entity.UserWard;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserGuardianServiceImpl implements UserGuardianService {

    private final UserService userService;
    private final FoodService foodService;
    private final WorkOutService workOutService;
    private final UserGuardianRepository userGuardianRepository;
    private final UserWardRepository userWardRepository;
    private final UserGuardianUserWardRepository userGuardianUserWardRepository;
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

    @Override
    public GetFoodInfoResponseDto getFoodInfo(Long userWardKakaoAccountId) {
        KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoAccountIdAndUserType.builder()
                .userType("ward")
                .kakaoAccountId(userWardKakaoAccountId)
                .build();

        return foodService.getFoodInfo(kaKaoAccountIdAndUserType);
    }

    @Override
    public GetFoodInfoResponseDto getFoodInfoByYearMonth(Long userWardKakaoAccountId, LocalDateTime startDate, LocalDateTime lastDate) {
        KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoAccountIdAndUserType.builder()
                .userType("ward")
                .kakaoAccountId(userWardKakaoAccountId)
                .build();

        return foodService.getFoodInfoByYearMonth(kaKaoAccountIdAndUserType, startDate, lastDate);
    }

    @Override
    public List<WorkOutRecordResponse> getAllWorkOutRecords(Long userWardKakaoAccountId) {
        KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoAccountIdAndUserType.builder()
                .userType("ward")
                .kakaoAccountId(userWardKakaoAccountId)
                .build();

        return workOutService.getAllWorkOutRecords(kaKaoAccountIdAndUserType);
    }

    @Override
    public List<WorkOutRecordResponse> getWorkOutRecordsByYearMonth(Long userWardKakaoAccountId, LocalDateTime startDate, LocalDateTime lastDate) {
        KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoAccountIdAndUserType.builder()
                .userType("ward")
                .kakaoAccountId(userWardKakaoAccountId)
                .build();

        return workOutService.getWorkOutRecordsByYearMonth(kaKaoAccountIdAndUserType, startDate, lastDate);
    }

    @Override
    public String connectWard(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, Long userWardKakaoAccountId) throws HttpClientErrorException, NoSuchElementException{
        UserGuardian userGuardian = userGuardianRepository.findUserGuardianByKakaoAccountId(kaKaoAccountIdAndUserType.getKakaoAccountId()).get();

        // 해당 유저코드가 없으면 예외발생
        UserWard userWard = userWardRepository.findUserWardByKakaoAccountId(userWardKakaoAccountId).get();

        // 이미 두 사용자가 연결되어 있다면 예외발생
        if (userGuardianUserWardRepository.existsByUserGuardianAndUserWard(userGuardian, userWard)) {
            throw new DuplicateUserConnectException("이미 연결되어 있는 계정입니다.", false);
        }


        UserGuardianUserWard connection = UserGuardianUserWard.builder()
                .userGuardian(userGuardian)
                .userWard(userWard)
                .build();

        userGuardianUserWardRepository.save(connection);


        return "새로운 시니어 등록이 완료되었습니다.";
    }

    @Override
    public String disconnectWard(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, Long userWardKakaoAccountId) throws HttpClientErrorException, NoSuchElementException{
        UserGuardian userGuardian = userGuardianRepository.findUserGuardianByKakaoAccountId(kaKaoAccountIdAndUserType.getKakaoAccountId()).get();

        // 해당 유저코드가 없으면 예외발생
        UserWard userWard = userWardRepository.findUserWardByKakaoAccountId(userWardKakaoAccountId).get();

        userGuardianUserWardRepository.deleteByUserGuardianAndUserWard(userGuardian, userWard);

        return "해당 연결이 정상적으로 삭제되었습니다.";
    }
}
