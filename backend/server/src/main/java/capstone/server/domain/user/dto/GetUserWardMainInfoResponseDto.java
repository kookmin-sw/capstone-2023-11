package capstone.server.domain.user.dto;

import capstone.server.domain.medicine.dto.ResponseMedicineInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetUserWardMainInfoResponseDto {
    private Long userCode;
    private String userName;
    private List<ResponseMedicineInfo> medicineInfoList;
    private int monthRecordCount;
    private int todayMealCount;
    private int todayWorkOutCount;
}
