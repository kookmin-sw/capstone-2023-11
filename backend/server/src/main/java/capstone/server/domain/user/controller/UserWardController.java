package capstone.server.domain.user.controller;

import capstone.server.domain.food.dto.GetFoodInfoResponseDto;
import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.user.service.UserWardService;
import capstone.server.utils.KaKaoUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

@RestController
@RequestMapping("/api/userward")
public class UserWardController {
    @Autowired
    UserWardService userWardService;

    @GetMapping(value = "/main")
    public ResponseEntity<?> getUserWardMainInfo(Authentication authentication) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);

        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (RuntimeException e) {
            return ResponseEntity.status(204).body(e.getMessage());
        }
    }

}
