package capstone.server.domain.login.dto;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;

@Data
@Builder
public class GuardianJoinRequest {

  private long height; // 키
  private long weight; // 몸무게
  private int drinkings; // 음주
  private int smoke; // 흡연
  private String kakaoAccesstoken;
//  private ArrayList<String> ills; // 질병


}
