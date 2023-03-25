package capstone.server.domain.login.dto;


import capstone.server.domain.login.enums.MedicalCategory;
import capstone.server.utils.UserType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Map;

@Getter
@NoArgsConstructor
public class KakaoTokenCheckResponse {
  private String result;
  private String userType;
  private String jwt = null;
  private String name;

  private ArrayList<Map<String,String>> medicalCategorys = new ArrayList<>();

  public void setName(String nickName) {
	this.name= nickName;
  }

  public void setUserGuardian(){
	this.userType = UserType.USER_GUARDIAN;
  }

  public void setToken(String jwt){
	this.jwt = jwt;
  }

  public void setUserWard(){
	this.userType = UserType.USER_WARD;
	for (MedicalCategory ill : MedicalCategory.values()) {
	  medicalCategorys.add(Map.of(ill.toString(), ill.getKor()));
	}
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
