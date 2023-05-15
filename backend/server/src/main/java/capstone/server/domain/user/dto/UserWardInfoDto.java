package capstone.server.domain.user.dto;

import capstone.server.domain.login.enums.GenderType;
import capstone.server.domain.login.enums.MedicalCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserWardInfoDto {
    private int height;
    private int weight;
    private int year;
    private int month;
    private int day;
    private int drinkings;
    private int smoke;
    private GenderType genderType;
    List<MedicalCategory> ills;
}
