package capstone.server.sample.controller;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.notification.dto.MealInfoMailDto;
import capstone.server.domain.notification.service.NotificationService;
import capstone.server.utils.KaKaoUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/test")
public class TestController {
  // Action Testing용 주석 추가

  private final TestServiceImpl testService;
  private final NotificationService notificationService;

  /*
  	authentication으로 넘어오는 인자를 파서에 넣으면 id와 type이 나옴
   */
  @PostMapping("/auth")
  public ResponseEntity<?> test(Authentication authentication){
	KaKaoAccountIdAndUserType kaKaoAccountIdAndUserTypeDto = KaKaoUtil.authConvertIdAndTypeDto(authentication);
	return ResponseEntity.ok()
			.body(kaKaoAccountIdAndUserTypeDto.getKakaoAccountId());
  }

  @GetMapping("/jwt/ward")
  public ResponseEntity<?> jwt(){
	String jwt = testService.temporaryJWTcreator();
	return ResponseEntity.ok()
			.body(jwt);
  }

  @GetMapping("/food/mail")
  public ResponseEntity<?> foodMailTest(Authentication authentication){
	notificationService.sendFoodMail(MealInfoMailDto.builder().build());
	return ResponseEntity.ok()
			.body("정상수");
  }


}
