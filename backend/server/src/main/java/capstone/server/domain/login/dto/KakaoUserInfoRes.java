package capstone.server.domain.login.dto;

import lombok.Data;

@Data
public class KakaoUserInfoRes {
  private Long id;
  private KakaoAccount kakao_account;
}
