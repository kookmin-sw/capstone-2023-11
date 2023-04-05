package capstone.server.domain.workout.dto;

import capstone.server.domain.workout.enums.WorkOutCategoryEnum;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class WorkOutRecordResponse {
  private Long id;
  private WorkOutCategoryEnum type;
  private Integer kcal;
  private LocalDate createdAt;
  private String kor;
  private String eng;
}
