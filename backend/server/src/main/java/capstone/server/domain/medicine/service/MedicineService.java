package capstone.server.domain.medicine.service;

import capstone.server.domain.medicine.dto.RegisterMedicineRequestDto;
import capstone.server.domain.medicine.dto.GetMedicineInfoResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MedicineService {

    public void registerMedicine(RegisterMedicineRequestDto registerMedicineRequestDto);

    public List<String> recognizeImage(byte[] imageBytes);

    public GetMedicineInfoResponseDto getMedicineInfo(String userToken);
}
