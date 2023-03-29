package capstone.server.domain.food.service;

import org.springframework.web.multipart.MultipartFile;

public class FoodServiceImpl implements FoodService{

    private static final String OCR_API_URL = "https://2930a5f2-4986-4c91-af31-a632271e9ffc.api.kr-central-1.kakaoi.io/ai/ocr/b394473530514a6783e2e527424900f5";
    @Override
    public String recognizeFoodImage(MultipartFile image) {

    }
}
