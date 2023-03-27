package capstone.server.global.dto;

import lombok.*;
import org.springframework.http.HttpStatus;

@Getter @Setter @Builder
@ToString
public class ErrorResponse {
  private HttpStatus status;
  private boolean success;
  private String message;

}
