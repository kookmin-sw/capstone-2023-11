package capstone.server.domain.medicine.controller;

import capstone.server.domain.medicine.dto.GetMedicineInfoResponseDto;
import capstone.server.domain.medicine.dto.RegisterMedicineRequestDto;
import capstone.server.domain.medicine.service.MedicineService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@Slf4j
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @PostMapping(value = "/medicine")
    public ResponseEntity<?> registerMedicine(@RequestBody RegisterMedicineRequestDto registerMedicineRequestDto) {
        try {
            return medicineService.registerMedicine(registerMedicineRequestDto);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        }

    }

    @PostMapping(value = "/medicine/ocr")
    public ResponseEntity<?> recognizeImage(@RequestPart(value = "image") MultipartFile image) {

        try {
            Object result = medicineService.recognizeImage(image);
            if (result instanceof List) {
                return ResponseEntity.ok().body(result);
            } else {
                ResponseEntity<?> response = (ResponseEntity<?>) result;
                log.info(String.valueOf(response.getStatusCode()));
                return response;
            }
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        }
    }


    @GetMapping(value = "/medicine")
    public ResponseEntity<?> getMedicineInfo(@RequestParam("userToken") String userToken) {
        try {
            GetMedicineInfoResponseDto result = medicineService.getMedicineInfo(userToken);
            return ResponseEntity.ok().body(result);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("INVALID_USER");
        }
    }
}

