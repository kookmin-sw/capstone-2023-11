package capstone.server.domain.user.controller;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.user.dto.ConnectedWard;
import capstone.server.domain.user.dto.GetDailySummaryDto;
import capstone.server.domain.user.dto.GetUserWardMainInfoResponseDto;
import capstone.server.domain.user.dto.GetWeeklySummaryDto;
import capstone.server.domain.user.exception.DuplicateUserConnectException;
import capstone.server.domain.user.service.UserGuardianService;
import capstone.server.global.dto.DefaultResponse;
import capstone.server.utils.KaKaoUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/userguardian")
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


}
