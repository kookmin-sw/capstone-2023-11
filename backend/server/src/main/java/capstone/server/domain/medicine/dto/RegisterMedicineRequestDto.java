package capstone.server.domain.medicine.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;


@Data
public class RegisterMedicineRequestDto {
    private List<MedicalInfo> medicalInfos;
    @Builder
    public RegisterMedicineRequestDto(List<MedicalInfo> medicalInfos) {
        this.medicalInfos = medicalInfos;
    }
}
