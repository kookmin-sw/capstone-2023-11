package capstone.server.domain.medicine.controller;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.medicine.dto.GetMedicineInfoResponseDto;
import capstone.server.domain.medicine.dto.ModifyMedicineDto;
import capstone.server.domain.medicine.dto.RequestMedicineInfo;
import capstone.server.domain.medicine.dto.RegisterMedicineDto;
import capstone.server.domain.medicine.service.MedicineService;
import capstone.server.global.dto.DefaultResponse;
import capstone.server.utils.KaKaoUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.multipart.MultipartFile;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class MedicineController {

    private final MedicineService medicineService;

    @PostMapping(value = "/medicine")
    public ResponseEntity<?> registerMedicine(Authentication authentication, @RequestBody List<RequestMedicineInfo> requestMedicineInfos) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);

            String result = medicineService.registerMedicine(RegisterMedicineDto.builder()
                    .kaKaoAccountIdAndUserType(kaKaoAccountIdAndUserType)
                    .requestMedicineInfos(requestMedicineInfos)
                    .build());

            return ResponseEntity.ok().body(result);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    DefaultResponse.builder()
                            .success(false)
                            .status(e.getStatusCode().value())
                            .message(e.getResponseBodyAsString())
                            .build());
        }

    }

    @PostMapping(value = "/medicine/ocr")
    public ResponseEntity<?> recognizeImage(Authentication authentication, @RequestPart(value = "image") MultipartFile image) {

        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);

            List<String> result = medicineService.recognizeImage(image);

            return ResponseEntity.ok().body(result);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    DefaultResponse.builder()
                            .success(false)
                            .status(e.getStatusCode().value())
                            .message(e.getResponseBodyAsString())
                            .build());
        } catch (URISyntaxException e) {
            return ResponseEntity.status(400).body(
                    DefaultResponse.builder()
                            .success(false)
                            .status(400)
                            .message("유효하지않은 URI")
                            .build());
        }
    }

    @GetMapping(value = "/medicine")
    public ResponseEntity<?> getMedicineInfo(Authentication authentication) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
            GetMedicineInfoResponseDto result = medicineService.getMedicineInfo(kaKaoAccountIdAndUserType);
            return ResponseEntity.ok().body(result);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    DefaultResponse.builder()
                            .success(false)
                            .status(e.getStatusCode().value())
                            .message(e.getResponseBodyAsString())
                            .build());
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    DefaultResponse.builder()
                            .success(false)
                            .status(400)
                            .message("INVALID_USER")
                            .build());
        }
    }

    @DeleteMapping(value = "/medicine/{id}")
    public ResponseEntity<?> deleteMedicine(Authentication authentication, @PathVariable Long id) {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);

            String result = medicineService.deleteMedicine(id);
            return ResponseEntity.ok().body(result);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    DefaultResponse.builder()
                            .success(false)
                            .status(e.getStatusCode().value())
                            .message(e.getResponseBodyAsString())
                            .build());
        }
    }

    @PatchMapping(value = "/medicine/{id}")
    public ResponseEntity<?> modifyMedicine(Authentication authentication, @PathVariable Long id, @RequestBody ModifyMedicineDto modifyMedicineDto)
    {
        try {
            KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
            String  result =  medicineService.modifyMedicine(kaKaoAccountIdAndUserType, id, modifyMedicineDto);
            return ResponseEntity.ok()
                    .body(
                            DefaultResponse.builder()
                                    .success(false)
                                    .status(200)
                                    .message(id + "번 약 수정완료")
                                    .build()
                    );
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(
                            DefaultResponse.builder()
                                    .success(false)
                                    .status(e.getStatusCode().value())
                                    .message(e.getMessage())
                                    .build()
                    );
        } catch (NullPointerException e) {
            return ResponseEntity.status(204)
                    .body(
                            DefaultResponse.builder()
                                    .success(false)
                                    .status(204)
                                    .message("유효하지 않은 약 ID입니다.")
                                    .build()
                    );
        }
    }
}

