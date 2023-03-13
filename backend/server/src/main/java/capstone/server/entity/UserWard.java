package capstone.server.entity;

import capstone.server.utils.BaseTimeEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

@Getter @Setter @ToString
@Table(name = "userWard")
@Entity
public class UserWard extends BaseTimeEntity {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  private Long userId;

  @Column(name = "kakao_account_id")
  private Long kakaoAccountId;

  @Column(name = "profile_image_url")
  private String profileImageUrl;

  @Column(name = "thumbnail_image_url")
  private String thumbnailImageUrl;

  @Column(name = "name")
  private String name;

  @Column(name = "birthday")
  private LocalDate birthday;

  @Column(name= "gender")
  private String gender;

  @Column(name = "phone_number")
  private String phoneNumber;

  @Column(name = "weight")
  private int weight;

  @Column(name="height")
  private int height;
}
