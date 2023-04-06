package capstone.server.domain.login.exception;

import capstone.server.global.dto.DefaultResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionManager {
  @ExceptionHandler(DuplicateUserException.class)
  public ResponseEntity<?> duplicateUserExceptionHandler(DuplicateUserException e) {
	return ResponseEntity.status(e.getStatus())
			.body(DefaultResponse.builder()
					.status(e.getStatus())
					.success(e.isSuccess())
					.message(e.getMessage())
					.build());
  }
}
