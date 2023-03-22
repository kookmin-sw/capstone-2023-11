package capstone.server.domain.login.dto;


import capstone.server.utils.UserType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class KakaoTokenCheckResponse {
  private String result;
  private String userType;

  public void setUserGuardian(){
	this.userType = UserType.USER_GUARDIAN;
  }

  public void setUserWard(){
	this.userType = UserType.USER_WARD;
  }

  public void setLogin() {
	this.result = "login";
  }

  public void setSignUp() {
	this.result = "signUp";
  }
}
