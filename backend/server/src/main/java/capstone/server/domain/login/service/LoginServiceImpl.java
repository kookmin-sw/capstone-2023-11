package capstone.server.domain.login.service;

import capstone.server.domain.login.dto.KakaoTokenCheckRequest;
import capstone.server.domain.login.dto.KakaoUserInfoRes;
import capstone.server.domain.user.repository.UserGuardianRepository;
import capstone.server.domain.user.repository.UserWardRepository;
import capstone.server.utils.JwtUtil;
import capstone.server.utils.KaKaoUtil;
import capstone.server.utils.UserType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class LoginServiceImpl implements LoginService {
  private final UserWardRepository userWardRepository;
  private final UserGuardianRepository userGuardianRepository;

	@Value("${jwt.secret}")
	private String secretKey;

	private Long expiredAtMs = 1000L * 60 * 60; //1시간

  @Override
  public String login(KakaoTokenCheckRequest kakaoTokenCheckRequest) {
	KakaoUserInfoRes userInfo = getUserInfo(kakaoTokenCheckRequest.getToken());
	return JwtUtil.createJwt(kakaoTokenCheckRequest.getUserType(), userInfo.getId(), secretKey, expiredAtMs);

  }

  /*
   회원가입한 이력이 있는지 확인하는 메소드
   accessToken내의 userType을 확인하여 해당 테이블에서 uid를 확인해야 함
   */
  @Override
  public boolean isUserAlreadySignUp(KakaoTokenCheckRequest accessToken) throws HttpClientErrorException{
	// 카카오로부터 uid가져오기
	KakaoUserInfoRes userInfo = getUserInfo(accessToken.getToken());
	log.info("user-id : " + userInfo.getId().toString());
	boolean isUserAlreadySignUp = false;

	// 보호자인지 피보호자인지 확인
	if (accessToken.getUserType().equals(UserType.USER_WARD)) {
	  // 피보호자(노인)일때
	  isUserAlreadySignUp = userWardRepository.existsByKakaoAccountId(userInfo.getId());

	}else {
	  // 보호자일 때
	  isUserAlreadySignUp = userGuardianRepository.existsByKakaoAccountId(userInfo.getId());
	}
	return isUserAlreadySignUp;
  }

  @Override
  public KakaoUserInfoRes getUserInfo(String accessToken) throws HttpClientErrorException {
	RestTemplate rt = new RestTemplate();

	// 헤더에 토큰 넣어주기
	HttpHeaders headers = new HttpHeaders();
	headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
	headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=utf-8");
	HttpEntity<MultiValueMap<String, String>> kakaoUserInfoReq = new HttpEntity<>(headers);


	ResponseEntity<KakaoUserInfoRes> response = rt.exchange(
			KaKaoUtil.KakaoUserInfoURLWithAccessTokenSecureTrue,
			HttpMethod.GET,
			kakaoUserInfoReq,
			KakaoUserInfoRes.class
	);
	log.info("response.toString() : " + response.toString());

	return response.getBody();
  }
}
