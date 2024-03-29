package capstone.server.domain.medicine.service;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.medicine.dto.*;
import capstone.server.domain.medicine.repository.MedicineRepository;
import capstone.server.domain.user.repository.UserWardRepository;
import capstone.server.entity.Medicine;
import capstone.server.entity.UserWard;
import capstone.server.utils.DateTimeUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.json.JSONArray;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MedicineServiceImpl implements MedicineService {

    private final MedicineRepository medicineRepository;
    private final UserWardRepository userWardRepository;

    @Value("${kakao.ocr.url}")
    private String OCR_API_URL;
    @Value("${kakao.ocr.key}")
    private String OCR_API_KEY;

    @Override
    public String registerMedicine(RegisterMedicineDto registerMedicineDto) throws HttpClientErrorException{

        Optional<UserWard> userWard = userWardRepository.findUserWardByKakaoAccountId(registerMedicineDto.getKaKaoAccountIdAndUserType().getKakaoAccountId());

        for (RequestMedicineInfo info : registerMedicineDto.getRequestMedicineInfos()) {
            Medicine medicine = Medicine.builder()
                    .name(info.getName())
                    .companyName(info.getCompanyName())
                    .caution(info.getCaution())
                    .useMethod(info.getUseMethod())
                    .depositMethod(info.getDepositMethod())
                    .effect(info.getEffect())
                    .imageUrl(info.getImageUrl())
                    .userWard(userWard.orElse(null))
                    .dueAt(LocalDateTime.now().plusDays(info.getDaysToTake()))
                    .breakfast(info.getBreakfast())
                    .lunch((info.getLunch()))
                    .dinner(info.getDinner()).build();

            medicineRepository.save(medicine);
        }

        return "등록이 완료되었습니다.";
    }

    @Override
    public List<String> recognizeImage(MultipartFile image) throws HttpClientErrorException, URISyntaxException {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.set("x-api-key", OCR_API_KEY);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        body.add("image",   image.getResource());

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        URI uri = new URI(OCR_API_URL);
        ResponseEntity<String> response = restTemplate.postForEntity(uri, requestEntity, String.class);
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
    public GetMedicineInfoResponseDto getMedicineInfo(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType) {
        Optional<UserWard> userWard = userWardRepository.findUserWardByKakaoAccountId(kaKaoAccountIdAndUserType.getKakaoAccountId());
        GetMedicineInfoResponseDto medicineInfos = GetMedicineInfoResponseDto.builder()
                .medicines(new ArrayList<>()).build();

        List<Medicine> medicineList = medicineRepository.findAllByUserWardUserId(userWard.get().getUserId());

        for (Medicine medicine : medicineList) {
            int remainDay = DateTimeUtils.getDaysBetween(LocalDateTime.now(), medicine.getDueAt());
            if (remainDay < 0) {
                continue;
            }

            medicineInfos.getMedicines().add(ResponseMedicineInfo.builder()
                    .id(medicine.getId())
                    .name(medicine.getName())
                    .companyName(medicine.getCompanyName())
                    .caution(medicine.getCaution())
                    .useMethod(medicine.getUseMethod())
                    .depositMethod(medicine.getDepositMethod())
                    .effect(medicine.getEffect())
                    .imageUrl(medicine.getImageUrl())
                    .createdAt(medicine.getCreatedAt())
                    .dueAt(medicine.getDueAt())
                    .remainDay((remainDay))
                    .breakfast(medicine.getBreakfast())
                    .lunch(medicine.getLunch())
                    .dinner(medicine.getDinner())
                    .build());
        }

        return medicineInfos;
    }

    @Override
    public String deleteMedicine(Long medicineId) throws HttpClientErrorException{
        medicineRepository.deleteById(medicineId);
        return "삭제가 완료되었습니다.";
    }

    @Override
    public String modifyMedicine(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, Long id, ModifyMedicineDto modifyMedicineDto) {
        Medicine medicine = medicineRepository.findById(id).orElse(null);
        UserWard userWard = userWardRepository.findUserWardByKakaoAccountId(kaKaoAccountIdAndUserType.getKakaoAccountId()).orElse(null);
        if (medicine == null) {
            throw new NullPointerException();
        }

        Medicine modifiedMedicine = Medicine.builder()
                .id(medicine.getId())
                .name(medicine.getName())
                .companyName(medicine.getCompanyName())
                .caution(medicine.getCaution())
                .useMethod(medicine.getUseMethod())
                .depositMethod(medicine.getDepositMethod())
                .effect(medicine.getEffect())
                .imageUrl(medicine.getImageUrl())
                .userWard(userWard)
                .dueAt(medicine.getCreatedAt().plusDays(modifyMedicineDto.getDaysToTake()))
                .breakfast(modifyMedicineDto.isBreakfast())
                .lunch(modifyMedicineDto.isLunch())
                .dinner(modifyMedicineDto.isDinner())
                .build();


        medicineRepository.save((modifiedMedicine));
        return "수정이 완료되었습니다.";
    }

}