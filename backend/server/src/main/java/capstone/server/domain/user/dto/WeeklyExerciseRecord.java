package capstone.server.domain.user.dto;

import java.time.LocalDate;

public class WeeklyExerciseRecord {
    private LocalDate date;
    private int calorie;
    private int hour;
    private int count;

    public void plus(int calorie, int hour) {
        this.calorie += calorie;
        this.hour += hour;
        this.count += 1;
    }
}
