package capstone.server.domain.user.dto;

import capstone.server.domain.login.enums.GenderType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConnectedWard {
    private Long kakaoAccountId;
    private String name;
    private LocalDate birthday;
    private int age;
    private String gender;
    private int weight;
    private int height;
    private Integer drinkings;
    private Integer smoke;
    private String email;
}
