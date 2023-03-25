package capstone.server.domain.medicine.service;

import capstone.server.domain.medicine.dto.RegisterMedicineRequestDto;
import capstone.server.domain.medicine.dto.GetMedicineInfoResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface MedicineService {

    public ResponseEntity registerMedicine(RegisterMedicineRequestDto registerMedicineRequestDto);

    public Object recognizeImage(MultipartFile image);

    public GetMedicineInfoResponseDto getMedicineInfo(String userToken);
}
