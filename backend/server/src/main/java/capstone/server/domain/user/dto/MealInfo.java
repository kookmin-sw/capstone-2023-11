package capstone.server.domain.user.dto;

import capstone.server.domain.food.dto.FoodInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MealInfo {
    private Long id;
    private LocalTime createdAt;
    private int times;
    private String imageUrl;
    private List<FoodInfo> detail;
}
