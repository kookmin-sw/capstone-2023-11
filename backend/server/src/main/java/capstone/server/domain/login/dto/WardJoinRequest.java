package capstone.server.domain.login.dto;


import capstone.server.domain.login.enums.GenderType;
import capstone.server.domain.login.enums.MedicalCategory;
import lombok.Data;

import java.util.ArrayList;

@Data
public class WardJoinRequest {

  private int height; // 키
  private int weight; // 몸무게
  private int drinkings; // 음주량
  private int smoke; // 흡연량
  private int year;
  private int month;
  private int day;
  private String email;
  private GenderType genderType;
  private String kakaoAccesstoken;
  private ArrayList<MedicalCategory> ills; // 병 태그들

}
