package capstone.server.medicine.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RegisterMedicineRequestDto {
    private String userToken;
    private String name;
    private String companyName;
    private String depositMethod;
    private String effect;
    private String usage;
    private String caution;
    private String imageUrl;
}
