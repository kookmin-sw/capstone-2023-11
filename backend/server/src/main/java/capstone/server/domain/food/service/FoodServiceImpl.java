package capstone.server.domain.food.service;

import capstone.server.domain.food.dto.FoodDetectionResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
@Service
@Slf4j
public class FoodServiceImpl implements FoodService{

    private static final String FOOD_RECOGNITION_API_URL = "https://42f35e59-34e2-483d-b735-2022a03bfc39.api.kr-central-1.kakaoi.io/ai/vision/5a68a02c3c814dff8ff608eab7e43a14";
    @Override
    public FoodDetectionResponseDto recognizeFoodImage(MultipartFile image) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.set("x-api-key", "cf6f684aece07fe26ca81b185a39ef2f");

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        body.add("image", image.getResource());

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<FoodDetectionResponseDto> response;
        response = restTemplate.postForEntity(FOOD_RECOGNITION_API_URL, requestEntity, FoodDetectionResponseDto.class);
        log.info(response.getBody().toString());


        return response.getBody();
    }
}
