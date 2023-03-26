package capstone.server.sample.controller;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.utils.KaKaoUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/test")
public class TestController {

  /*
  	authentication으로 넘어오는 인자를 파서에 넣으면 id와 type이 나옴
   */
  @PostMapping("/auth")
  public ResponseEntity<?> test(Authentication authentication){
	KaKaoAccountIdAndUserType kaKaoAccountIdAndUserTypeDto = KaKaoUtil.authConvertIdAndTypeDto(authentication);
	return ResponseEntity.ok()
			.body(kaKaoAccountIdAndUserTypeDto.getKakaoAccountId());
  }
}
