package capstone.server.medicine.test;

import capstone.server.domain.medicine.controller.MedicineController;
import org.junit.Test;
import org.junit.jupiter.api.Disabled;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;

import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest(controllers = MedicineController.class)
class testImageTest {

    @Autowired
    private MockMvc mvc;
    @Test
    @Disabled("이미지 테스트")
    void test1() throws IOException {
        // 이미지 파일을 Base64로 인코딩

        System.out.println("Test1");
        File file = new File("C:\\KakaoTalk_20230321_203045442.jpg");
        byte[] bytes = Files.readAllBytes(file.toPath());
        String base64Image = Base64.getEncoder().encodeToString(bytes);

        // 폼 데이터 생성
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("image", base64Image);

        // 요청 보내기
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        TestRestTemplate restTemplate = null;
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(formData, headers);
        ResponseEntity<String> response = restTemplate.postForEntity("/medicine/ocr", requestEntity, String.class);

        // 응답 확인
        assertEquals(HttpStatus.OK, response.getStatusCode());
        System.out.println(response.getBody());


    }

}