package capstone.server.domain.food.service;

import capstone.server.domain.food.dto.FoodDetectionResponseDto;
import capstone.server.domain.food.dto.GetFoodInfoResponseDto;
import capstone.server.domain.food.dto.RegisterFoodDto;
import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
public interface FoodService {

    public FoodDetectionResponseDto detectFoodImage(MultipartFile image) throws IOException;
    public ResponseEntity registerFood(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, MultipartFile image, RegisterFoodDto registerFoodDto) throws IOException;

    public GetFoodInfoResponseDto getFoodInfo(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);

    public GetFoodInfoResponseDto getFoodInfoByYearMonth(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, LocalDateTime startDate, LocalDateTime lastDate);

    public ResponseEntity deleteMeal(Long mealId);

}
