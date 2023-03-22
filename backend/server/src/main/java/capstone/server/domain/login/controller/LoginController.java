package capstone.server.domain.login.controller;

import capstone.server.domain.login.dto.KakaoTokenCheckRequest;
import capstone.server.domain.login.dto.KakaoTokenCheckResponse;
import capstone.server.domain.login.service.LoginService;
import capstone.server.utils.UserType;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/login")
@RestController
public class LoginController {
  private final LoginService loginService;

  @PostMapping("/token-check")
  private ResponseEntity<KakaoTokenCheckResponse> tokenCheck(@RequestBody KakaoTokenCheckRequest tokenCheckRequest){
	KakaoTokenCheckResponse kakaoTokenCheckResponse = new KakaoTokenCheckResponse();

	// UserType 확인
	if( tokenCheckRequest.getUserType().equals(UserType.USER_GUARDIAN)) kakaoTokenCheckResponse.setUserGuardian();
	else if (tokenCheckRequest.getUserType().equals(UserType.USER_WARD)) kakaoTokenCheckResponse.setUserWard();

	// User 회원가입 이력 확인
	if ( loginService.isUserAlreadySignUp(tokenCheckRequest)){
	  kakaoTokenCheckResponse.setLogin();
	}else {
	  kakaoTokenCheckResponse.setSignUp();
	}
	return ResponseEntity.ok()
			.body(kakaoTokenCheckResponse);
  }

//  @GetMapping("/test")
//  private String test(@RequestParam String token) {
//	loginService.getUserInfo(token);
//	return "TEST OK!";
//  }
}
