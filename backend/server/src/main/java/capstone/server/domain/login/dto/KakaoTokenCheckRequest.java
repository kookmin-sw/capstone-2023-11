package capstone.server.domain.login.dto;

import lombok.Data;

@Data
public class KakaoTokenCheckRequest {
  private String token;
  private String userType;
}
