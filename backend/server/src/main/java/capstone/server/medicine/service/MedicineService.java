package capstone.server.medicine.service;

import capstone.server.medicine.dto.RegisterMedicineRequestDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MedicineService {

    public void registerMedicine(List<RegisterMedicineRequestDto> registerMedicineRequestDtoList);
}
