package capstone.server.domain.medicine.dto;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import lombok.Builder;
import lombok.Data;

import java.util.List;


@Data
@Builder
public class RegisterMedicineDto {

    private KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType;
    private List<RequestMedicineInfo> requestMedicineInfos;
}
