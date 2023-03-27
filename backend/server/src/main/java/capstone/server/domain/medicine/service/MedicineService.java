package capstone.server.domain.medicine.service;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.medicine.dto.RegisterMedicineDto;
import capstone.server.domain.medicine.dto.GetMedicineInfoResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface MedicineService {

    public ResponseEntity registerMedicine(RegisterMedicineDto registerMedicineDto);

    public Object recognizeImage(MultipartFile image);

    public GetMedicineInfoResponseDto getMedicineInfo(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);
}
