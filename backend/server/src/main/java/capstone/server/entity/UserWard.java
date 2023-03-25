package capstone.server.entity;

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
public class UserWard extends BaseTimeEntity {

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
  private String gender;

  @Column(name = "weight")
  private int weight;

  @Column(name="height")
  private int height;

  @Column(name = "drinkings")
  private Integer drinkings;
  @Column(name = "smoke")
  private Integer smoke;
}
