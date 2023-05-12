package capstone.server.domain.user.controller;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.user.dto.ConnectedWard;
import capstone.server.domain.user.dto.GetDailySummaryDto;
import capstone.server.domain.user.dto.GetUserWardMainInfoResponseDto;
import capstone.server.domain.user.dto.GetWeeklySummaryDto;
import capstone.server.domain.user.service.UserGuardianService;
import capstone.server.global.dto.DefaultResponse;
import capstone.server.utils.KaKaoUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;

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
}
