package capstone.server.medicine.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;


@Data
public class RegisterMedicineRequestDto {
    private List<MedicalInfo> medicalInfos;
}
