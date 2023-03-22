package capstone.server.entity;

import capstone.server.utils.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

@Getter @ToString
@Table(name = "userWard")
@Entity
@Setter
public class UserWard extends BaseTimeEntity {

  @Builder
  public UserWard(Long kakaoAccountId, String profileImageUrl, String thumbnailImageUrl, String name, LocalDate birthday, String gender, String phoneNumber, int weight, int height) {
    this.kakaoAccountId = kakaoAccountId;
    this.profileImageUrl = profileImageUrl;
    this.thumbnailImageUrl = thumbnailImageUrl;
    this.name = name;
    this.birthday = birthday;
    this.gender = gender;
    this.phoneNumber = phoneNumber;
    this.weight = weight;
    this.height = height;
  }

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
