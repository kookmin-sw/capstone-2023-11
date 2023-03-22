package capstone.server.domain.login.service;

import capstone.server.domain.login.dto.KakaoTokenCheckRequest;
import capstone.server.domain.login.dto.KakaoUserInfoRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class LoginServiceImpl implements LoginService{
  @Override
  public KakaoUserInfoRes getUserInfo(String accessToken) {
	return null;
  }

  @Override
  public boolean isUserAlreadySignUp(KakaoTokenCheckRequest accessToken) {
	return false;
  }


//  private String kakaoUserInfoEndPoint = "https://kapi.kakao.com/v2/user/me?secure_resource=true";
//  private String token = "SkxlEqeRY_3W0URifN8niZ5WcFCTiI-XVNe-kXbQCioljwAAAYb035fR";
//  @Override
//  public KakaoUserInfoRes getUserInfo(String accessToken) {
//	RestTemplate rt = new RestTemplate();
//
//	HttpHeaders headers = new HttpHeaders();
//	headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken );
//	headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE +";charset=utf-8");
//
//	HttpEntity<MultiValueMap<String,String>> kakaoUserInfoReq = new HttpEntity<>(headers);
//
//	ResponseEntity<String> response = rt.exchange(
//			kakaoUserInfoEndPoint,
//			HttpMethod.GET,
//			kakaoUserInfoReq,
//			String.class
//	);
//
//	log.info(response.toString());
//
//	return null;
//  }
}
