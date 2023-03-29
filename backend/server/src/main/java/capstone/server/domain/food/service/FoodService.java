package capstone.server.domain.food.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface FoodService {

    public String recognizeFoodImage(MultipartFile image);
}
