package capstone.server.domain.food.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MealInfo {
    private Long id;
    private LocalDateTime dateTime;
    private int times;
    private List<FoodInfo> detail;
}
