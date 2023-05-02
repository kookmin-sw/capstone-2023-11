package capstone.server.domain.user.dto;

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
    private double calorie;
    private double carbohyborateTotal;
    private double protein;
    private double fatTotal;
}