package capstone.server.domain.user.dto;

import capstone.server.domain.login.enums.GenderType;
import capstone.server.entity.MedicalHistoryCategory;
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
    private GenderType gender;
    private int age;
    private int weight;
    private int height;
    List<MedicalHistoryCategory> medicalHistory;
    private int drinkings;
    private int smoke;
    List<WeeklyFoodNutrient> foodNutrients;
    List<Integer> exerciseCalories;

}
