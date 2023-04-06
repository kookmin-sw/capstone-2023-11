package capstone.server.domain.workout.dto;

import capstone.server.domain.workout.enums.WorkOutCategoryEnum;
import lombok.Data;

@Data
public class RegisterWorkOutRequest {
	private WorkOutCategoryEnum type;
	private Integer hour;
}
