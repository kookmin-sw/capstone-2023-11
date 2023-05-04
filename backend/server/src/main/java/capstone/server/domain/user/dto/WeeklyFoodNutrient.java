package capstone.server.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WeeklyFoodNutrient {
    private double calorie;
    private double carbohydrate;
    private double fat;
    private double cholesterol;
    private double natrium;

}
