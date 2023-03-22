package capstone.server.domain.login.dto;

import lombok.Data;

@Data
public class KakaoUserInfoRes {
  private Long id;
  private KakaoProperties properties;
  private String email; // has_email이 true인 경우에만
  private String gender;
}
