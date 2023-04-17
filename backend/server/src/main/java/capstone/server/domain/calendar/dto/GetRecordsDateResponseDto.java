package capstone.server.domain.calendar.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetRecordsDateResponseDto {
    private List<LocalDate> MealRecordDate;
    private List<LocalDate> WorkOutRecordDate;
}
