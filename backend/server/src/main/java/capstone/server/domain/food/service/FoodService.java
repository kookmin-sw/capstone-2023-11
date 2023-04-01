package capstone.server.domain.food.service;

import capstone.server.domain.food.dto.FoodDetectionResponseDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface FoodService {

    public FoodDetectionResponseDto detectFoodImage(MultipartFile image);
}
