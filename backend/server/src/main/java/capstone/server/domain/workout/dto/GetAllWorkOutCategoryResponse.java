package capstone.server.domain.workout.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Builder
@Getter
@AllArgsConstructor @NoArgsConstructor
public class GetAllWorkOutCategoryResponse {
  private ArrayList<WorkOutCategoryResponse> workOutCategoryList = new ArrayList<>();
}
