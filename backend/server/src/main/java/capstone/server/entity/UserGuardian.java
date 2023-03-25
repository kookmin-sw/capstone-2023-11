package capstone.server.entity;

import capstone.server.utils.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter @ToString
@Table(name = "userGuardian")
@Entity
public class UserGuardian extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Column(name = "gender")
    private String gender;

    @Column(name = "weight")
    private Long weight;

    @Column(name = "height")
    private Long height;
}

