package capstone.server.entity;

import capstone.server.utils.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter @ToString
@Table(name = "meal")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Meal extends BaseTimeEntity {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "times")
  private int times;  // 몇끼째인지 확인하기 위한 용도

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "image_id")
  private Image image;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_ward_user_id")
  private UserWard userWard;

}
