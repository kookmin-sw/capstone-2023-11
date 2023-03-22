package capstone.server.medicine.service;

import capstone.server.entity.Medicine;
import capstone.server.entity.UserWard;
import capstone.server.medicine.dto.MedicalInfo;
import capstone.server.medicine.dto.RegisterMedicineRequestDto;
import capstone.server.medicine.repository.MedicineRepository;
import capstone.server.medicine.repository.UserWardRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.logging.Logger;

@Service
@Slf4j
public class MedicineServiceImpl implements MedicineService{

    @Autowired
    private MedicineRepository medicineRepository;
    @Autowired
    private UserWardRepository userWardRepository;



    @Override
    @Transactional
    public void registerMedicine(RegisterMedicineRequestDto registerMedicineRequestDto) {
        // TODO
        // user Token으로 id뽑아오기
        // dueAt 계산 구현
        UserWard dummy = UserWard.builder()
                .kakaoAccountId(123L)
                .gender("ge")
                .height(123)
                .birthday(LocalDate.now())
                .phoneNumber("123")
                .weight(123)
                .profileImageUrl("dsad")
                .thumbnailImageUrl("dsad")
                .name("test")
                .build();

        userWardRepository.save(dummy);

        for (MedicalInfo info : registerMedicineRequestDto.getMedicalInfos()) {
            Medicine medicine = Medicine.builder()
                    .name(info.getName())
                    .companyName(info.getCompanyName())
                    .caution(info.getCaution())
                    .useMethod(info.getUseMethod())
                    .depositMethod(info.getDepositMethod())
                    .effect(info.getEffect())
                    .imageUrl(info.getImageUrl())
                    .userWard(userWardRepository.findByName("test"))
                    .dueAt(LocalDateTime.now()).build();


            medicineRepository.save(medicine);
        }

    }

}
