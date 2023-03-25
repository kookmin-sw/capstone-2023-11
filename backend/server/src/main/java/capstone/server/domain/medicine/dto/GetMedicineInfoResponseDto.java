package capstone.server.domain.medicine.dto;

import capstone.server.entity.Medicine;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class GetMedicineInfoResponseDto {
    List<Medicine> medicines;

    @Builder
    public GetMedicineInfoResponseDto(List<Medicine> medicines) {
        this.medicines = medicines;
    }
}
