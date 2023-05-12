package capstone.server.domain.user.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class DuplicateUserConnectException extends RuntimeException{
    private boolean success;
    private int status = HttpStatus.CONFLICT.value();
    public DuplicateUserConnectException(String message, boolean success) {
        super(message);
        this.success = success;
    }
}
