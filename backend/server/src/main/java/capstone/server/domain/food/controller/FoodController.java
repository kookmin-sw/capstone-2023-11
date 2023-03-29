package capstone.server.domain.food.controller;

import capstone.server.domain.food.dto.FoodDetectionBox;
import capstone.server.domain.food.dto.FoodDetectionResponseDto;
import capstone.server.domain.food.service.FoodService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@Slf4j
public class FoodController {

    @Autowired
    private FoodService foodService;

    @PostMapping(value = "/food")
    public ResponseEntity<?> recognizeFoodImage(Authentication authentication, @RequestPart(value = "image")MultipartFile image) {
        FoodDetectionResponseDto result = foodService.recognizeFoodImage(image);

        return ResponseEntity.ok().body(result);
    }


}
