package capstone.server.domain.notification.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmailName {
  private String name;
  private String email;
}
