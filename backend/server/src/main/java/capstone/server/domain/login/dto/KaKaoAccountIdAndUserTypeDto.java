package capstone.server.domain.login.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KaKaoAccountIdAndUserTypeDto {

  private Long kakaoAccountId;
  private String userType;
}
