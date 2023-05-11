package capstone.server.domain.notification.dto;

import capstone.server.domain.food.dto.FoodInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MealInfoMailDto {
	private LocalDateTime dateTime;
	private int times;
	private String imageUrl;
	private List<FoodInfo> details;
	private Long wardId;
}
