package capstone.server.domain.login.controller;

import capstone.server.domain.login.dto.KakaoTokenCheckRequest;
import capstone.server.domain.login.dto.KakaoTokenCheckResponse;
import capstone.server.domain.login.service.LoginService;
import capstone.server.utils.JwtUtil;
import capstone.server.utils.UserType;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

@RequiredArgsConstructor
@RequestMapping("/api/login")
@RestController
public class LoginController {
  private final LoginService loginService;

  @PostMapping("/token-check")
  public ResponseEntity<?> tokenCheck(@RequestBody KakaoTokenCheckRequest tokenCheckRequest) {
	/**
	 * TODO 이미 회원가입 정보가 있던 유저라면, JWT토큰 만들어서 돌려줘야함
	 */

	KakaoTokenCheckResponse kakaoTokenCheckResponse = new KakaoTokenCheckResponse();

	// UserType 확인
	if (tokenCheckRequest.getUserType().equals(UserType.USER_GUARDIAN)) kakaoTokenCheckResponse.setUserGuardian();
	else if (tokenCheckRequest.getUserType().equals(UserType.USER_WARD)) kakaoTokenCheckResponse.setUserWard();

	// User 회원가입 이력 확인
	try {
	  if (loginService.isUserAlreadySignUp(tokenCheckRequest)) {
		// TODO 토큰 발급  , return시 Body에 token 담아서 주기
		kakaoTokenCheckResponse.setLogin();
		kakaoTokenCheckResponse.setToken(loginService.login(tokenCheckRequest));
		return ResponseEntity.ok()
				.body(kakaoTokenCheckResponse);
	  } else {
		kakaoTokenCheckResponse.setSignUp();
	  }
	  return ResponseEntity.ok()
			  .body(kakaoTokenCheckResponse);
	} catch (HttpClientErrorException httpClientErrorException) {
	  kakaoTokenCheckResponse.setError();
	  return ResponseEntity.status(httpClientErrorException.getStatusCode())
			  .body(kakaoTokenCheckResponse);
	}
  }
}
