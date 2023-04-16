package capstone.server.domain.food.controller;

import capstone.server.domain.food.dto.FoodDetectionResponseDto;
import capstone.server.domain.food.dto.GetFoodInfoResponseDto;
import capstone.server.domain.food.dto.RegisterFoodDto;
import capstone.server.domain.food.service.FoodService;
import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.medicine.dto.GetMedicineInfoResponseDto;
import capstone.server.domain.workout.dto.WorkOutRecordResponse;
import capstone.server.entity.Food;
import capstone.server.global.dto.DefaultResponse;
import capstone.server.utils.KaKaoUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
            return ResponseEntity.status(e.getStatusCode()).body(
                    DefaultResponse.builder()
                            .success(false)
                            .status(e.getStatusCode().value())
                            .message(e.getResponseBodyAsString())
                            .build());
        } catch (IOException e) {
            return ResponseEntity.status(500).body(
                    DefaultResponse.builder()
                            .success(false)
                            .status(500)
                            .message(e.getMessage())
                            .build()
            );
        }
    }

    @PostMapping(value = "/food")
    public ResponseEntity<?> registerFood(Authentication authentication, @RequestPart(value = "image") MultipartFile image, @RequestPart(value = "food_info") RegisterFoodDto foods) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
            String result = foodService.registerFood(kaKaoAccountIdAndUserType, image, foods);
            return ResponseEntity.ok().body(result);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    DefaultResponse.builder()
                            .success(false)
                            .status(e.getStatusCode().value())
                            .message(e.getResponseBodyAsString())
                            .build()
            );
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(
                    DefaultResponse.builder()
                            .success(false)
                            .status(400)
                            .message(e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping(value = "/food")
    public ResponseEntity<?> getFoodInfo(Authentication authentication,
                                         @RequestParam(value = "date", required = false) @DateTimeFormat(pattern = "yyyy-MM") String dateStr) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);

            if (dateStr == null) {
                GetFoodInfoResponseDto getFoodInfoResponseDto = foodService.getFoodInfo(kaKaoAccountIdAndUserType);
                return ResponseEntity.ok().body(getFoodInfoResponseDto);
            } else {
                int year = Integer.parseInt(dateStr.substring(0, 4));
                int month = Integer.parseInt(dateStr.substring(5));

                // yyyy-MM-dd로 사용
                LocalDate startDate = LocalDate.of(year,month,1);
                LocalDate lastDate = LocalDate.of(year,month,startDate.lengthOfMonth());

                // DB 조회를 위해서 시간대로 변경
                LocalDateTime startDateTime = LocalDateTime.of(startDate, LocalTime.MIN);
                LocalDateTime lastDateTime = LocalDateTime.of(lastDate, LocalTime.MAX);

                log.info("startDateTime : " + startDateTime + " lastDateTime : " + lastDateTime);

                GetFoodInfoResponseDto getFoodInfoResponseDto = foodService.getFoodInfoByYearMonth(kaKaoAccountIdAndUserType, startDateTime, lastDateTime);
                return ResponseEntity.ok().body(getFoodInfoResponseDto);
            }

        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    DefaultResponse.builder()
                            .success(false)
                            .status(e.getStatusCode().value())
                            .message(e.getMessage())
                            .build()
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(204).body(
                    DefaultResponse.builder()
                            .success(false)
                            .status(204)
                            .message(e.getMessage())
                            .build()
            );
        }
    }

    @DeleteMapping(value = "/food/{id}")
    public ResponseEntity<?> deleteMeal(Authentication authentication, @PathVariable Long id) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
            String result = foodService.deleteMeal(id);
            return ResponseEntity.ok().body(
                    DefaultResponse.builder()
                            .status(200)
                            .message(result)
                            .success(true)
                            .build()
            );
        } catch (HttpClientErrorException e) {
            return ResponseEntity.ok().body(
                    DefaultResponse.builder()
                            .status(e.getStatusCode().value())
                            .message(e.getMessage())
                            .success(false)
                            .build()
            );
        }
    }


}
