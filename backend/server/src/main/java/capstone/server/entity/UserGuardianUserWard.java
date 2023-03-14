package capstone.server.entity;


import capstone.server.utils.BaseTimeEntity;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Getter @ToString
@Table(name = "userGuardian_userWard")
@Entity
public class UserGuardianUserWard extends BaseTimeEntity {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_guardian_user_id")
  private UserGuardian userGuardian;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_ward_user_id")
  private UserWard userWard;
}
