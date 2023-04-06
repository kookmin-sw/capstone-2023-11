package capstone.server.domain.login.dto;


import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
@Builder
public class KaKaoAccountIdAndUserType {

  private Long kakaoAccountId;
  private String userType;
}
