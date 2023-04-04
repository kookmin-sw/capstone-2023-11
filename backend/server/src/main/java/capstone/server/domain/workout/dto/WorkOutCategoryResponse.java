package capstone.server.domain.workout.dto;


import capstone.server.domain.workout.enums.WorkOutCategoryEnum;
import lombok.Builder;
import lombok.Data;

@Data @Builder
public class WorkOutCategoryResponse {
  private String eng;
  private String kor;
  private WorkOutCategoryEnum type;
  private Integer kcalPerHour;
  private String description;

}
