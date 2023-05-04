package capstone.server.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeeklyExerciseRecord {
    private LocalDate date;
    private int calorie;
    private int hour;
    private int count;

    public WeeklyExerciseRecord(LocalDate date) {
        this.date = date;
        this.calorie = 0;
        this.hour = 0;
        this.count = 0;
    }

    public void plus(int calorie, int hour) {
        this.calorie += calorie;
        this.hour += hour;
        this.count += 1;
    }
}
