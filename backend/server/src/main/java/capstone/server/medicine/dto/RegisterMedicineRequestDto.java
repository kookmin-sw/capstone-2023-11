package capstone.server.medicine.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Data
public class RegisterMedicineRequestDto {
    private String userToken;
    private String name;
    private String companyName;
    private String depositMethod;
    private String effect;
    private String useMethod;
    private String caution;
    private String imageUrl;
}
