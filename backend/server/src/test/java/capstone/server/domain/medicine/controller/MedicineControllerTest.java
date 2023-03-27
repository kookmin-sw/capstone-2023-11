package capstone.server.domain.medicine.controller;

import capstone.server.domain.medicine.dto.MedicalInfo;
import capstone.server.domain.medicine.dto.RegisterMedicineDto;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@Transactional
class MedicineControllerTest {

    @Test
    void registerMedicine() {

//        System.out.println("약 들록 기능");
//        String baseUrl = "http://localhost:8080/api/medicine";
//        URI uri = URI.create(baseUrl);
//
//        List<MedicalInfo> infos = new ArrayList<>();
//
//        infos.add(MedicalInfo.builder()
//                .name("test")
//                .companyName("test")
//                .depositMethod("test")
//                .effect("test")
//                .useMethod("test")
//                .caution("test")
//                .imageUrl("test")
//                .build());
//
//        infos.add(MedicalInfo.builder()
//                .name("test2")
//                .companyName("test2")
//                .depositMethod("test2")
//                .effect("test2")
//                .useMethod("test2")
//                .caution("test2")
//                .imageUrl("test2")
//                .build());
//
//        RegisterMedicineDto dto = RegisterMedicineDto.builder().medicalInfos(infos).build();
//
//        HttpHeaders headers = new HttpHeaders();
//        TestRestTemplate restTemplate = new TestRestTemplate();
//        HttpEntity<RegisterMedicineDto> requestEntity = new HttpEntity<>(dto, headers);
//        ResponseEntity<String> response = restTemplate.postForEntity(uri, requestEntity, String.class);
//
//
//        // 응답 확인
//        System.out.println(response.getBody());
//        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());

    }

    @Test
    void recognizeImage() {

//        System.out.println("약봉투 이미지 인식");
//        System.out.println("Case1 - 정상케이스");
//        String baseUrl = "http://localhost:8080/api/medicine/ocr";
//        URI uri = URI.create(baseUrl);
//
//        // 폼 데이터 생성
//        MultiValueMap<String, Object> formData = new LinkedMultiValueMap<>();
//        formData.add("image", new FileSystemResource("D:\\KakaoTalk_20230323_181804078.jpg"));
//
//        // 요청 보내기
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
//        headers.set("");
//        TestRestTemplate restTemplate = new TestRestTemplate();
//        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(formData, headers);
//        ResponseEntity<String> response = restTemplate.postForEntity(uri, requestEntity, String.class);
//
//
//        // 응답 확인
//        System.out.println(response.getBody());
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//
//        System.out.println("Case2 - 이미지 파일 아닐때");
//
//        formData = new LinkedMultiValueMap<>();
//        formData.add("image", new FileSystemResource("D:\\4c81e112-b72f-4ba9-a301-c41a9d8b0d25_Export-97662411-6790-4797-8f70-f7493e0e74da.zip"));
//
//        headers = new HttpHeaders();
//        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
//        restTemplate = new TestRestTemplate();
//        requestEntity = new HttpEntity<>(formData, headers);
//        response = restTemplate.postForEntity(uri, requestEntity, String.class);
//
//        System.out.println(response.getBody());
//        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());

    }

    @Test
    void getMedicineInfo() {
    }
}