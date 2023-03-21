package capstone.server.medicine.service;

import capstone.server.medicine.dto.RegisterMedicineRequestDto;
import capstone.server.medicine.dto.PrescriptionDto;
import org.springframework.stereotype.Service;

@Service
public interface MedicineService {

    public void registerMedicine(RegisterMedicineRequestDto barcodeDto);
}
