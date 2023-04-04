package capstone.server.entity;

import capstone.server.domain.workout.dto.WorkOutCategoryDtoResponse;
import capstone.server.domain.workout.enums.WorkOutCategoryEnum;
import lombok.*;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@Table(name = "workOutCategory")
@Entity
public class WorkOutCategory {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name")
  @Enumerated(EnumType.STRING)
  private WorkOutCategoryEnum name;
  @Column(name = "kor")
  private String kor;
  @Column(name = "eng")
  private String eng;

  @Column(name = "kcal_per_hour")
  private Integer kcalPerHour;
  @Column(name = "description")
  private String description;

  public WorkOutCategoryDtoResponse toDto( ) {
    return WorkOutCategoryDtoResponse.builder()
            .kor(this.getKor())
            .eng(this.getEng())
            .type(this.getName())
            .kcalPerHour(this.getKcalPerHour())
            .description(this.getDescription())
            .build();
  }

}
