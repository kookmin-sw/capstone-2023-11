package capstone.server.medicine.controller;

import capstone.server.medicine.dto.BarcodeDto;
import capstone.server.medicine.dto.PrescriptionDto;
import capstone.server.medicine.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @PostMapping(value = "/medicine/barcode")
    public ResponseEntity<?> registerMedicineByBarcode(@RequestBody BarcodeDto barcodeDto) {
        medicineService.registerMedicineByBarcode(barcodeDto);
        return ResponseEntity.ok().body("Success");
    }

    @PostMapping(value = "/medicine/prescription")
    public ResponseEntity<?> registerMedicineByPrescription(@RequestBody PrescriptionDto prescriptionDto) {
        medicineService.registerMedicineByPrescription(prescriptionDto);
        return ResponseEntity.ok().body("Success");
    }
}
