package capstone.server.medicine.controller;

import capstone.server.entity.Medicine;
import capstone.server.medicine.dto.GetMedicineInfoResponseDto;
import capstone.server.medicine.dto.RegisterMedicineRequestDto;
import capstone.server.medicine.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @PostMapping(value = "/medicine")
    public ResponseEntity<?> registerMedicine(@RequestBody RegisterMedicineRequestDto registerMedicineRequestDto) {
        medicineService.registerMedicine(registerMedicineRequestDto);
        return ResponseEntity.ok().body("Success");
    }

    @PostMapping(value = "/medicine/ocr")
    public ResponseEntity<?> recognizeImage(@RequestParam("image")String image) throws IOException {
//        byte[] imageBytes = image.getBytes();
        File file = new File("C:\\KakaoTalk_20230321_203045442.jpg");
        byte[] imageBytes = Files.readAllBytes(file.toPath());

        List<String> result = medicineService.recognizeImage(imageBytes);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping(value = "/medicine")
    public ResponseEntity<?> getMedicineInfo(@RequestParam("userToken")String userToken) {

        GetMedicineInfoResponseDto infos = medicineService.getMedicineInfo(userToken);
        return ResponseEntity.ok().body(infos);

    }

}

