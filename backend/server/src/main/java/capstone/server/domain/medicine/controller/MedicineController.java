package capstone.server.domain.medicine.controller;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.medicine.dto.GetMedicineInfoResponseDto;
import capstone.server.domain.medicine.dto.RequestMedicineInfo;
import capstone.server.domain.medicine.dto.RegisterMedicineDto;
import capstone.server.domain.medicine.service.MedicineService;
import capstone.server.utils.KaKaoUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@Slf4j
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @PostMapping(value = "/medicine")
    public ResponseEntity<?> registerMedicine(Authentication authentication, @RequestBody List<RequestMedicineInfo> requestMedicineInfos) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);


            return medicineService.registerMedicine(RegisterMedicineDto.builder()
                    .kaKaoAccountIdAndUserType(kaKaoAccountIdAndUserType)
                    .requestMedicineInfos(requestMedicineInfos)
                    .build());
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        }

    }

    @PostMapping(value = "/medicine/ocr")
    public ResponseEntity<?> recognizeImage(Authentication authentication, @RequestPart(value = "image") MultipartFile image) {

        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);

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
    public ResponseEntity<?> getMedicineInfo(Authentication authentication) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
            GetMedicineInfoResponseDto result = medicineService.getMedicineInfo(kaKaoAccountIdAndUserType);
            return ResponseEntity.ok().body(result);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("INVALID_USER");
        }
    }

    @DeleteMapping(value = "/medicine/{id}")
    public ResponseEntity<?> deleteMedicine(Authentication authentication, @PathVariable Long id) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);

            ResponseEntity result = medicineService.deleteMedicine(id);
            return result;
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        }
    }
}

