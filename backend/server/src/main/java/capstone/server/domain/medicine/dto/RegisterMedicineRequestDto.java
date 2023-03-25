package capstone.server.domain.medicine.dto;

import lombok.Data;

import java.util.List;


@Data
public class RegisterMedicineRequestDto {
    private List<MedicalInfo> medicalInfos;
}
