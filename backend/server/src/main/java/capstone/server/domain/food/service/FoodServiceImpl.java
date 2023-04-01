package capstone.server.domain.food.service;

import capstone.server.domain.food.dto.FoodDetectionResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
@Service
@Slf4j
public class FoodServiceImpl implements FoodService{

    @Value("${kakao.food-detection.url")
    private String FOOD_DETECTION_API_URL;
    @Value("${kakao.food-detection.key")
    private String FOOD_DETECTION_API_KEY;
    @Override
    public FoodDetectionResponseDto detectFoodImage(MultipartFile image) throws HttpClientErrorException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.set("x-api-key", FOOD_DETECTION_API_KEY);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        body.add("image", image.getResource());

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<FoodDetectionResponseDto> response;
        response = restTemplate.postForEntity(FOOD_DETECTION_API_URL, requestEntity, FoodDetectionResponseDto.class);
        log.info(response.getBody().toString());


        return response.getBody();
    }
}
