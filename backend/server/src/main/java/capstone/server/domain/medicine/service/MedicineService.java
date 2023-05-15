package capstone.server.domain.medicine.service;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.medicine.dto.ModifyMedicineDto;
import capstone.server.domain.medicine.dto.RegisterMedicineDto;
import capstone.server.domain.medicine.dto.GetMedicineInfoResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.URISyntaxException;
import java.util.List;

@Service
public interface MedicineService {

    public String registerMedicine(RegisterMedicineDto registerMedicineDto);

    public List<String> recognizeImage(MultipartFile image) throws URISyntaxException;

    public GetMedicineInfoResponseDto getMedicineInfo(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);

    public String deleteMedicine(Long medicineId);

    public String modifyMedicine(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, Long id, ModifyMedicineDto modifyMedicineDto);
}
