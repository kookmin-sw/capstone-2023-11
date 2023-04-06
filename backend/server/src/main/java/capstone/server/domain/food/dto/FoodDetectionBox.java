package capstone.server.domain.food.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodDetectionBox {
    private int x;
    private int y;
    private int w;
    private int h;

    @JsonProperty("class_info")
    private List<FoodDetectionClassInfo> classInfo;

}
