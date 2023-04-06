package capstone.server.domain.food.controller;

import capstone.server.domain.food.dto.FoodDetectionResponseDto;
import capstone.server.domain.food.dto.GetFoodInfoResponseDto;
import capstone.server.domain.food.dto.RegisterFoodDto;
import capstone.server.domain.food.service.FoodService;
import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.medicine.dto.GetMedicineInfoResponseDto;
import capstone.server.entity.Food;
import capstone.server.utils.KaKaoUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@Slf4j
public class FoodController {

    @Autowired
    private FoodService foodService;

    @PostMapping(value = "/food/detect")
    public ResponseEntity<?> detectFoodImage(Authentication authentication, @RequestParam(value = "image")MultipartFile image) {

        try {
            FoodDetectionResponseDto result = foodService.detectFoodImage(image);
            return ResponseEntity.ok().body(result);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (IOException e) {
            return ResponseEntity.ok().body(e.getMessage());
        }
    }

    @PostMapping(value = "/food/")
    public ResponseEntity<?> registerFood(Authentication authentication, @RequestPart(value = "image") MultipartFile image, @RequestPart(value = "food_info") RegisterFoodDto foods) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
            ResponseEntity result = foodService.registerFood(kaKaoAccountIdAndUserType, image, foods);
            return result;
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping(value = "/food")
    public ResponseEntity<?> getFoodInfo(Authentication authentication) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
            GetFoodInfoResponseDto getFoodInfoResponseDto = foodService.getFoodInfo(kaKaoAccountIdAndUserType);
            return ResponseEntity.ok().body(getFoodInfoResponseDto);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (RuntimeException e) {
            return ResponseEntity.status(204).body(e.getMessage());
        }
    }


}
