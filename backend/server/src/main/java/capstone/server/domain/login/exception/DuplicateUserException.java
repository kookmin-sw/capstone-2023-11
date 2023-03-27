package capstone.server.domain.login.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@Getter
public class DuplicateUserException extends RuntimeException{
  private boolean success;
  private HttpStatus status = HttpStatus.CONFLICT;
  public DuplicateUserException(String message,boolean success) {
	super(message);
	this.success = success;
  }
}
