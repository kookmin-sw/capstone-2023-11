package capstone.server.utils;

import java.time.Duration;
import java.time.LocalDateTime;

public class DateTimeUtils {
    public static int getDaysBetween(LocalDateTime startDateTime, LocalDateTime endDateTime) {
        Duration duration = Duration.between(startDateTime, endDateTime);
        long seconds = duration.getSeconds();
        int days = (int) Math.ceil(seconds / (double) (3600 * 24));
        return days;
    }

}
