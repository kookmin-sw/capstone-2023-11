package capstone.server.domain.user.controller;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.user.dto.*;
import capstone.server.domain.user.service.UserWardService;
import capstone.server.global.dto.DefaultResponse;
import capstone.server.utils.KaKaoUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/userward")
public class UserWardController {

    private final UserWardService userWardService;

    @GetMapping(value = "/main")
    public ResponseEntity<?> getUserWardMainInfo(Authentication authentication) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
            GetUserWardMainInfoResponseDto result = userWardService.getUserWardMainInfo(kaKaoAccountIdAndUserType);
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
    public ResponseEntity<?> getDailySummary(Authentication authentication) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
            GetDailySummaryDto result = userWardService.getDailySummary(kaKaoAccountIdAndUserType);
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
    public ResponseEntity<?> getWeeklySummary(Authentication authentication) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
            GetWeeklySummaryDto result = userWardService.getWeeklySummary(kaKaoAccountIdAndUserType);
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

    @PatchMapping(value = "/modify")
    public ResponseEntity<?> modifyUserWardInfo(Authentication authentication, @RequestBody UserWardInfoDto userWardInfoDto) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
            String result = userWardService.modifyUserWardInfo(kaKaoAccountIdAndUserType, userWardInfoDto);
            return ResponseEntity.ok().body(result);

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

    @GetMapping(value = "/connected-guardians")
    public ResponseEntity<?> getConnectedGuardians(Authentication authentication) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
            List<ConnectedGuardian> result = userWardService.getConnectedGuardians(kaKaoAccountIdAndUserType);
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
