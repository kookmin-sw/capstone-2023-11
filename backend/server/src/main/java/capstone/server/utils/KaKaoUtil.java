package capstone.server.utils;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;

@Slf4j
public class KaKaoUtil {
  public static String KakaoUserInfoURLWithAccessToken = "https://kapi.kakao.com/v2/user/me";
  public static String KakaoUserInfoURLWithAccessTokenSecureTrue = "https://kapi.kakao.com/v2/user/me?secure_resource=true";

  public static KaKaoAccountIdAndUserType authConvertIdAndTypeDto(Authentication authentication) {
    KaKaoAccountIdAndUserType kaKaoAccountIdAndUserTypeDto = (KaKaoAccountIdAndUserType) authentication.getPrincipal();
    log.info("userType : " + kaKaoAccountIdAndUserTypeDto.getUserType());
    log.info("getKakaoAccountId : " +kaKaoAccountIdAndUserTypeDto.getKakaoAccountId());
    return kaKaoAccountIdAndUserTypeDto;

  }
}
