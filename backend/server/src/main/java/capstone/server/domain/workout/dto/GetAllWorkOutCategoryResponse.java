package capstone.server.domain.workout.dto;


import capstone.server.domain.workout.enums.WorkOutCategoryEnum;
import capstone.server.entity.WorkOutCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Builder
@Getter
@AllArgsConstructor @NoArgsConstructor
public class GetAllWorkOutCategoryResponse {
  private ArrayList<WorkOutCategoryDto> workOutCategoryList = new ArrayList<>();
}
