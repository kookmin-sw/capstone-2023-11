package capstone.server.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConnectedGuardian {
    private Long kakaoAccountId;
    private String name;
    private String email;
}
