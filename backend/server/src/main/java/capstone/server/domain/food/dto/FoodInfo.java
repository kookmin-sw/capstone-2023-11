package capstone.server.domain.food.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodInfo {
    private String name;
    private double servingSize;
    private double calorie;
    private double carbohyborateTotal;
    private double carbohyborateSugar;
    private double carbohyborateDietaryFiber;
    private double protein;
    private double fatTotal;
    private double fatTransFat;
    private double fatSaturatedfat;
    private double cholesterol;
    private double natrium;


}
