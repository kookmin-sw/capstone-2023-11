package capstone.server.domain.medicine.service;

import capstone.server.domain.medicine.dto.MedicalInfo;
import capstone.server.domain.medicine.dto.RegisterMedicineRequestDto;
import capstone.server.domain.medicine.repository.MedicineRepository;
import capstone.server.domain.medicine.repository.UserWardRepository;
import capstone.server.entity.Medicine;
import capstone.server.entity.UserWard;
import capstone.server.domain.medicine.dto.GetMedicineInfoResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.json.JSONArray;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;
    @Autowired
    private UserWardRepository userWardRepository;

    private static final String OCR_API_URL = "https://2930a5f2-4986-4c91-af31-a632271e9ffc.api.kr-central-1.kakaoi.io/ai/ocr/b394473530514a6783e2e527424900f5";

    @Override
    @Transactional
    public ResponseEntity registerMedicine(RegisterMedicineRequestDto registerMedicineRequestDto) throws HttpClientErrorException{
        // TODO
        // user Token으로 id뽑아오기
        // dueAt 계산 구현
//        UserWard dummy = UserWard.builder()
//                .kakaoAccountId(123L)
//                .gender("ge")
//                .height(123)
//                .birthday(LocalDate.now())
//                .phoneNumber("123")
//                .weight(123)
//                .profileImageUrl("dsad")
//                .thumbnailImageUrl("dsad")
//                .name("test")
//                .build();
//
//        userWardRepository.save(dummy);

        UserWard userWard = userWardRepository.findByName("test");
        if (userWard == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("INVALID_USER");

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

        return ResponseEntity.ok().body("Success");
    }

    @Override
    public Object recognizeImage(MultipartFile image) throws HttpClientErrorException {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.set("x-api-key", "ab97f873303a3a06defcde9a6348912a");

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        body.add("image", image.getResource());

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(OCR_API_URL, requestEntity, String.class);
        log.info(response.getBody());
        List<String> infos = new ArrayList<>();
        JSONObject object = new JSONObject(response.getBody());
        JSONArray responses = object.getJSONArray("responses");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < responses.length(); i++) {
            JSONObject page = responses.getJSONObject(i);
            JSONArray results = page.getJSONArray("results");
            for (int j = 0; j < results.length(); j++) {
                JSONObject result = results.getJSONObject(j);
                JSONArray recognizedWords = result.getJSONArray("recognized_word");
                for (int k = 0; k < recognizedWords.length(); k++) {
                    sb.append(recognizedWords.getString(k));
                    sb.append(" ");
                }
            }
        }

        String recognizedWordsString = sb.toString().trim();
        log.info(recognizedWordsString);
        Pattern pattern = Pattern.compile("(\\S+)\\s+\\[[^\\]]+\\]");
        Matcher matcher = pattern.matcher(recognizedWordsString);

        while (matcher.find()) {
            String drugName = matcher.group(1);
            infos.add(drugName);
        }

        return infos;
    }

    @Override
    public GetMedicineInfoResponseDto getMedicineInfo(String userToken) {
        // TODO
        // userWardRepository FindByToken;
        Long userId = userWardRepository.findByName(userToken).getUserId();
        if (userId == null)
            return null;
        GetMedicineInfoResponseDto medicineInfos = GetMedicineInfoResponseDto.builder()
                .medicines(medicineRepository.findAllByUserWardUserId(userId)).build();

        return medicineInfos;
    }

}