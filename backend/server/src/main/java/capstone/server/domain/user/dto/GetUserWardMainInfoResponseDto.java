package capstone.server.domain.user.dto;

import capstone.server.domain.login.enums.GenderType;
import capstone.server.domain.login.enums.MedicalCategory;
import capstone.server.domain.medicine.dto.ResponseMedicineInfo;
import capstone.server.entity.MedicalHistoryCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetUserWardMainInfoResponseDto {
    private Long userCode;
    private String userName;
    private LocalDate birthday;
    private int height;
    private int weight;
    private GenderType gender;
    private int age;
    private int drinkings;
    private int smoke;
    private List<ResponseMedicineInfo> medicineInfoList;
    private List<MedicalHistoryCategory> ills;
    private int monthRecordCount;
    private int todayMealCount;
    private int todayWorkOutCount;
}
