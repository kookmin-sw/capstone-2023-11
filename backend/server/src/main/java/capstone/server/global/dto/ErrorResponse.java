package capstone.server.global.dto;

import lombok.*;
import org.springframework.http.HttpStatus;

@Getter @Builder
@ToString
public class ErrorResponse {
  private int status;
  private boolean success;
  private String message;

}
