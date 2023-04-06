package capstone.server.entity;

import capstone.server.domain.workout.dto.WorkOutRecordResponse;
import capstone.server.utils.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
@Table(name = "workOutUserWardHas")
@Entity
public class WorkOutUserWardHas extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_ward_user_id")
  private UserWard userWard;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "work_out_category_id")
  private WorkOutCategory workOutCategory;

  @Column(name = "hour")
  private Integer hour;

  @Column(name = "kcal")
  private Integer kcal;

  public WorkOutRecordResponse toDto() {
    return WorkOutRecordResponse.builder()
            .id(this.getId())
            .kor(this.workOutCategory.getKor())
            .eng(this.workOutCategory.getEng())
            .type(this.workOutCategory.getName())
            .kcal(this.getKcal())
            .createdAt(this.getCreatedAt().toLocalDate())
            .build();

  }
}
