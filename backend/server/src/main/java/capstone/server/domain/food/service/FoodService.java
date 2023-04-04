package capstone.server.domain.food.service;

import capstone.server.domain.food.dto.FoodDetectionResponseDto;
import capstone.server.domain.food.dto.GetFoodInfoResponseDto;
import capstone.server.domain.food.dto.RegisterFoodDto;
import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface FoodService {

    public FoodDetectionResponseDto detectFoodImage(MultipartFile image);
    public ResponseEntity registerFood(Long kakaoAccountId, RegisterFoodDto registerFoodDto);

    public GetFoodInfoResponseDto getFoodInfo(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);

}
