package capstone.server.medicine.service;

import capstone.server.entity.Medicine;
import capstone.server.entity.UserWard;
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
    public void registerMedicine(List<RegisterMedicineRequestDto> registerMedicineRequestDtoList) {
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
        for (RegisterMedicineRequestDto dto : registerMedicineRequestDtoList) {
            Medicine medicine = Medicine.builder()
                    .name(dto.getName())
                    .companyName(dto.getCompanyName())
                    .caution(dto.getCaution())
                    .useMethod(dto.getUseMethod())
                    .depositMethod(dto.getDepositMethod())
                    .effect(dto.getEffect())
                    .imageUrl(dto.getImageUrl())
                    .userWard(userWardRepository.findByName("test"))
                    .dueAt(LocalDateTime.now()).build();


            medicineRepository.save(medicine);
        }

    }

}
