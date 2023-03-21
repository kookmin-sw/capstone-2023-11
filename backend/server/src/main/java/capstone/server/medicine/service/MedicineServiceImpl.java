package capstone.server.medicine.service;

import capstone.server.entity.Medicine;
import capstone.server.medicine.dto.RegisterMedicineRequestDto;
import capstone.server.medicine.dto.PrescriptionDto;
import capstone.server.medicine.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

public class MedicineServiceImpl implements MedicineService{

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private RestTemplate restTemplate;


    @Override
    @Transactional
    public void registerMedicine(RegisterMedicineRequestDto barcodeDto) {

        Medicine medicine = new Medicine();
    }

}
