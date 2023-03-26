package capstone.server.entity;

import capstone.server.domain.login.enums.GenderType;
import capstone.server.utils.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Builder
@Getter @ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "userWard")
@Entity
@Setter
public class UserWard extends BaseTimeEntity {

  @Builder
  public UserWard(Long kakaoAccountId, String name, LocalDate birthday, GenderType gender,int weight, int height) {
    this.kakaoAccountId = kakaoAccountId;
    this.name = name;
    this.birthday = birthday;
    this.gender = gender;
    this.weight = weight;
    this.height = height;
  }

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  private Long userId;


  @Column(name = "kakao_account_id")
  private Long kakaoAccountId;

  @Column(name = "name")
  private String name;

  @Column(name = "birthday")
  private LocalDate birthday;

  @Column(name= "gender")
  @Enumerated(EnumType.STRING)
  private GenderType gender;

  @Column(name = "weight")
  private int weight;

  @Column(name="height")
  private int height;

  @Column(name = "drinkings")
  private Integer drinkings;
  @Column(name = "smoke")
  private Integer smoke;
}
