package capstone.server.domain.login.dto;


import capstone.server.utils.UserType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class KakaoTokenCheckResponse {
  private String result;
  private String userType;
  private String token = null;

  private String name;

  public void setName(String nickName) {
	this.name= nickName;
  }

  public void setUserGuardian(){
	this.userType = UserType.USER_GUARDIAN;
  }

  public void setToken(String token){
	this.token = token;
  }

  public void setUserWard(){
	this.userType = UserType.USER_WARD;
  }

  public void setLogin() {
	this.result = "login";
  }

  public void setError() {
	this.result = "error";
	this.userType = "error";
  }

  public void setSignUp() {
	this.result = "signUp";
  }
}
