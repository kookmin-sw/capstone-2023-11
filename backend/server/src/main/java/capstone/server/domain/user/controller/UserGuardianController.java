package capstone.server.domain.user.controller;

import capstone.server.domain.food.dto.GetFoodInfoResponseDto;
import capstone.server.domain.food.service.FoodService;
import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.medicine.dto.GetMedicineInfoResponseDto;
import capstone.server.domain.user.dto.ConnectedWard;
import capstone.server.domain.user.dto.GetDailySummaryDto;
import capstone.server.domain.user.dto.GetUserWardMainInfoResponseDto;
import capstone.server.domain.user.dto.GetWeeklySummaryDto;
import capstone.server.domain.user.exception.DuplicateUserConnectException;
import capstone.server.domain.user.service.UserGuardianService;
import capstone.server.domain.workout.dto.WorkOutRecordResponse;
import capstone.server.domain.workout.service.WorkOutService;
import capstone.server.global.dto.DefaultResponse;
import capstone.server.utils.KaKaoUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/userguardian")
@Slf4j
public class UserGuardianController {
    private final UserGuardianService userGuardianService;

    @GetMapping(value = "/main")
    public ResponseEntity<?> getUserWardMainInfo(Authentication authentication, @RequestParam(value = "wardId") Long userWardKakaoAccountId) {
        try {
            GetUserWardMainInfoResponseDto result = userGuardianService.getUserWardMainInfo(userWardKakaoAccountId);
            return ResponseEntity.ok().body(result);

        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    DefaultResponse.builder()
                            .success(false)
                            .message(e.getResponseBodyAsString())
                            .status(500)
                            .build()
            );
        }
    }

    @GetMapping(value = "/summary/daily")
    public ResponseEntity<?> getDailySummary(Authentication authentication, @RequestParam(value = "wardId") Long userWardKakaoAccountId) {
        try {
            GetDailySummaryDto result = userGuardianService.getDailySummary(userWardKakaoAccountId);
            return ResponseEntity.ok().body(result);

        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    DefaultResponse.builder()
                            .success(false)
                            .message(e.getResponseBodyAsString())
                            .status(500)
                            .build()
            );
        }
    }

    @GetMapping(value = "/summary/weekly")
    public ResponseEntity<?> getWeeklySummary(Authentication authentication, @RequestParam(value = "wardId") Long userWardKakaoAccountId) {
        try {
            GetWeeklySummaryDto result = userGuardianService.getWeeklySummary(userWardKakaoAccountId);
            return ResponseEntity.ok().body(result);

        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    DefaultResponse.builder()
                            .success(false)
                            .message(e.getResponseBodyAsString())
                            .status(500)
                            .build()
            );
        }
    }

    @GetMapping(value = "/connected-wards")
    public ResponseEntity<?> getConnectedWards(Authentication authentication) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
            List<ConnectedWard> result = userGuardianService.getConnectedWards(kaKaoAccountIdAndUserType);
            return ResponseEntity.ok().body(result);

        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    DefaultResponse.builder()
                            .success(false)
                            .message(e.getResponseBodyAsString())
                            .status(500)
                            .build()
            );
        }
    }
    @GetMapping("/workout/records")
    public ResponseEntity<?> getAllWorkOutRecords(Authentication authentication,
                                                  @RequestParam(value = "wardId") Long userWardKakaoAccountId,
                                                  @RequestParam(value = "date", required = false) @DateTimeFormat(pattern = "yyyy-MM") String dateStr) {


        try {
            if (dateStr == null) {
                // 모든 운동력 조회
                List<WorkOutRecordResponse> allWorkOutRecords = userGuardianService.getAllWorkOutRecords(userWardKakaoAccountId);
                return ResponseEntity.ok()
                        .body(allWorkOutRecords);
            } else {
                log.info(dateStr);

                int year = Integer.parseInt(dateStr.substring(0, 4));
                int month = Integer.parseInt(dateStr.substring(5));

                // yyyy-MM-dd로 사용
                LocalDate startDate = LocalDate.of(year,month,1);
                LocalDate lastDate = LocalDate.of(year,month,startDate.lengthOfMonth());

                // DB 조회를 위해서 시간대로 변경
                LocalDateTime startDateTime = LocalDateTime.of(startDate, LocalTime.MIN);
                LocalDateTime lastDateTime = LocalDateTime.of(lastDate, LocalTime.MAX);

                log.info("startDateTime : " + startDateTime + " lastDateTime : " + lastDateTime);

                List<WorkOutRecordResponse> workOutRecordsByYearMonth = userGuardianService.getWorkOutRecordsByYearMonth(userWardKakaoAccountId, startDateTime,lastDateTime);
                return ResponseEntity.ok()
                        .body(workOutRecordsByYearMonth);
            }

        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(
                            DefaultResponse.builder()
                                    .success(false)
                                    .status(e.getStatusCode().value())
                                    .message(e.getMessage())
                                    .build()
                    );
        }
    }
    @GetMapping(value = "/food")
    public ResponseEntity<?> getFoodInfo(Authentication authentication,
                                         @RequestParam(value = "wardId") Long userWardKakaoAccountId,
                                         @RequestParam(value = "date", required = false) @DateTimeFormat(pattern = "yyyy-MM") String dateStr) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoAccountIdAndUserType.builder()
                    .kakaoAccountId(userWardKakaoAccountId)
                    .userType("ward")
                    .build();

            if (dateStr == null) {
                GetFoodInfoResponseDto getFoodInfoResponseDto = userGuardianService.getFoodInfo(userWardKakaoAccountId);
                return ResponseEntity.ok().body(getFoodInfoResponseDto);
            } else {
                int year = Integer.parseInt(dateStr.substring(0, 4));
                int month = Integer.parseInt(dateStr.substring(5));

                // yyyy-MM-dd로 사용
                LocalDate startDate = LocalDate.of(year,month,1);
                LocalDate lastDate = LocalDate.of(year,month,startDate.lengthOfMonth());

                // DB 조회를 위해서 시간대로 변경
                LocalDateTime startDateTime = LocalDateTime.of(startDate, LocalTime.MIN);
                LocalDateTime lastDateTime = LocalDateTime.of(lastDate, LocalTime.MAX);

                log.info("startDateTime : " + startDateTime + " lastDateTime : " + lastDateTime);

                GetFoodInfoResponseDto getFoodInfoResponseDto = userGuardianService.getFoodInfoByYearMonth(userWardKakaoAccountId, startDateTime, lastDateTime);
                return ResponseEntity.ok().body(getFoodInfoResponseDto);
            }

        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    DefaultResponse.builder()
                            .success(false)
                            .status(e.getStatusCode().value())
                            .message(e.getMessage())
                            .build()
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(204).body(
                    DefaultResponse.builder()
                            .success(false)
                            .status(204)
                            .message(e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping(value = "/medicine")
    public ResponseEntity<?> getMedicineInfo(Authentication authentication, @RequestParam(value = "wardId") Long userWardKakaoAccountId) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
            GetMedicineInfoResponseDto result = userGuardianService.getMedicineInfo(userWardKakaoAccountId);
            return ResponseEntity.ok().body(result);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    DefaultResponse.builder()
                            .success(false)
                            .status(e.getStatusCode().value())
                            .message(e.getMessage())
                            .build()
            );
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    DefaultResponse.builder()
                            .success(false)
                            .status(400)
                            .message(e.getMessage())
                            .build()
            );
        }
    }

    @PostMapping(value = "/connect")
    public ResponseEntity<?> connectWard(Authentication authentication, @RequestBody Long userWardKakaoAccountId) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
            String result = userGuardianService.connectWard(kaKaoAccountIdAndUserType, userWardKakaoAccountId);
            return ResponseEntity.ok().body(result);

        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    DefaultResponse.builder()
                            .success(false)
                            .message(e.getResponseBodyAsString())
                            .status(500)
                            .build()
            );
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    DefaultResponse.builder()
                            .success(false)
                            .message("존재하지 않는 유저코드 입니다.")
                            .status(HttpStatus.BAD_REQUEST.value())
                            .build()
            );
        } catch (DuplicateUserConnectException e) {
            return ResponseEntity.status(e.getStatus()).body(
                    DefaultResponse.builder()
                            .success(false)
                            .message(e.getMessage())
                            .status(e.getStatus())
                            .build()
            );
        }
    }

    @DeleteMapping(value = "/connect/{userWardId}")
    public ResponseEntity<?> disconnectWard(Authentication authentication, @PathVariable Long userWardId) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
            String result = userGuardianService.disconnectWard(kaKaoAccountIdAndUserType, userWardId);
            return ResponseEntity.ok().body(
                    DefaultResponse.builder()
                            .status(200)
                            .message(result)
                            .success(true)
                            .build()
            );
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(500).body(
                    DefaultResponse.builder()
                            .status(e.getStatusCode().value())
                            .message(e.getMessage())
                            .success(false)
                            .build()
            );
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    DefaultResponse.builder()
                            .status(HttpStatus.BAD_REQUEST.value())
                            .message("등록되어있지 않은 유저이거나 이미 삭제되었습니다.")
                            .success(false)
                            .build()
            );
        }
    }

}
