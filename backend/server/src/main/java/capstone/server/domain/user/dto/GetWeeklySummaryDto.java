package capstone.server.domain.user.dto;

import capstone.server.domain.medical.dto.MedicalHistoryInfo;
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
    private String gender;
    private int age;
    private int weight;
    private int height;
    private int drinkings;
    private int smoke;
    List<MedicalHistoryInfo> medicalHistory;
    List<WeeklyFoodNutrient> weeklyFoodNutrientSum;
    List<WeeklyExerciseRecord> weeklyExerciseInfo;

}
