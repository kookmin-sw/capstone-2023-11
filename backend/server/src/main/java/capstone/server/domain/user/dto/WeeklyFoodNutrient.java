package capstone.server.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WeeklyFoodNutrient {
    private LocalDate date;
    private double calorie;
    private double carbohydrate;
    private double protein;
    private double fat;
    private double cholesterol;
    private double natrium;

    public WeeklyFoodNutrient(LocalDate date) {
        this.date = date;
        this.calorie = 0;
        this.carbohydrate = 0;
        this.protein = 0;
        this.cholesterol = 0;
        this.natrium = 0;
    }
    public void plus(double calorie, double carbohydrate, double protein, double fat, double cholesterol, double natrium) {
        this.calorie += calorie;
        this.carbohydrate += carbohydrate;
        this.protein += protein;
        this.fat += fat;
        this.cholesterol += cholesterol;
        this.natrium += natrium;
    }
}
