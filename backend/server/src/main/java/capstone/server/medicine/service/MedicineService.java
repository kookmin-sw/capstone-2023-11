package capstone.server.medicine.service;

import capstone.server.medicine.dto.RegisterMedicineRequestDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface MedicineService {

    public void registerMedicine(RegisterMedicineRequestDto registerMedicineRequestDto);

    public List<String> recognizeImage(byte[] imageBytes);
}
