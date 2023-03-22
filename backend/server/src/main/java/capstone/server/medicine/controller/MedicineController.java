package capstone.server.medicine.controller;

import capstone.server.medicine.dto.RegisterMedicineRequestDto;
import capstone.server.medicine.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @PostMapping(value = "/medicine/register")
    public ResponseEntity<?> registerMedicine(@RequestBody List<RegisterMedicineRequestDto> registerMedicineRequestDtoList) {
        medicineService.registerMedicine(registerMedicineRequestDtoList);
        return ResponseEntity.ok().body("Success");
    }
}
