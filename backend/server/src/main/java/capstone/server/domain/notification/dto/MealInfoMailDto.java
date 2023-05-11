package capstone.server.domain.notification.dto;

import capstone.server.domain.food.dto.FoodInfo;
import capstone.server.domain.food.dto.MealInfo;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MealInfoMailDto {
	private MealInfo mealInfo;
	private Long wardId;
}
