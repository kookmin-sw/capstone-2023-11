package capstone.server.domain.food.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodDetectionClassInfo {
    int rank;
    @JsonProperty("food_name")
    String foodName;
    float prob;
    @JsonProperty("food_nutrients")
    HashMap<String, Object> foodNutrients;
}
