package capstone.server.global.dto;

import lombok.*;

@Getter @Builder
@ToString
public class DefaultResponse {
  private int status;
  private boolean success;
  private String message;

}
