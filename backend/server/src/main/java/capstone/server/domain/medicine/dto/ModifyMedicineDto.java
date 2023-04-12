package capstone.server.domain.medicine.dto;

import lombok.Data;

@Data
public class ModifyMedicineDto {
    private Integer daysToTake;
    private boolean breakfast;
    private boolean lunch;
    private boolean dinner;

}
