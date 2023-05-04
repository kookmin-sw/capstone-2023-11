package capstone.server.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetWeeklySummaryDto {
    private String name;
    private String gender;
    private int age;
    private int weight;
    private int height;
    List<String> medicalHistory;
    private int drinkings;
    private int smoke;
    List<WeeklyFoodNutrient> weeklyFoodNutrientSum;
    List<WeeklyExerciseRecord> weeklyExerciseInfo;

}
