package capstone.server.medicine.service;

import capstone.server.medicine.dto.GetMedicineInfoResponseDto;
import capstone.server.medicine.dto.RegisterMedicineRequestDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface MedicineService {

    public void registerMedicine(RegisterMedicineRequestDto registerMedicineRequestDto);

    public List<String> recognizeImage(byte[] imageBytes);

    public GetMedicineInfoResponseDto getMedicineInfo(String userToken);
}
