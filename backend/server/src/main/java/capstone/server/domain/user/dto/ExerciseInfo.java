package capstone.server.domain.user.dto;

import capstone.server.domain.workout.enums.WorkOutCategoryEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseInfo {
    private Long id;
    private LocalTime createdAt;
    private WorkOutCategoryEnum type;
    private Integer kcal;
    private String kor;
    private String eng;
    private Integer hour;
}
