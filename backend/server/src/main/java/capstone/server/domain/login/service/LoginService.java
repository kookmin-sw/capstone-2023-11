package capstone.server.domain.login.service;

import capstone.server.domain.login.dto.KakaoTokenCheckRequest;
import capstone.server.domain.login.dto.KakaoUserInfoRes;
import org.springframework.http.ResponseEntity;

public interface LoginService {

  //카카오 서버에 접근토큰을 통해서 정보가져오기
  KakaoUserInfoRes getUserInfo(String accessToken);
  boolean isUserAlreadySignUp(KakaoTokenCheckRequest accessToken);
  String login(KakaoTokenCheckRequest kakaoTokenCheckRequest);

}
