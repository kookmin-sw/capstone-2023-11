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
public class FoodDetectionResponseDto {
    private String version;
    @JsonProperty("request_id")
    private String requestId;
    private String created;
    @JsonProperty("proc_secs")
    private float procSecs;

    private List<FoodDetectionBox> result;

}
