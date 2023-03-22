package capstone.server.medicine.service;

import capstone.server.entity.Medicine;
import capstone.server.medicine.dto.RegisterMedicineRequestDto;
import capstone.server.medicine.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;

public class MedicineServiceImpl implements MedicineService{

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private RestTemplate restTemplate;


    @Override
    @Transactional
    public void registerMedicine(List<RegisterMedicineRequestDto> registerMedicineRequestDtoList) {
        // TODO
        // user Token으로 id뽑아오기
        for (RegisterMedicineRequestDto registerMedicineRequestDto : registerMedicineRequestDtoList) {
            Medicine medicine = new Medicine();
            medicine.
        }

    }

}
