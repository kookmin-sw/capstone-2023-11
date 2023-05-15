package capstone.server.domain.login.dto;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;

@Data
@Builder
public class GuardianJoinRequest {
  private ArrayList<Long> wardCodes;
  private String kakaoAccesstoken;
  private String email;

}
