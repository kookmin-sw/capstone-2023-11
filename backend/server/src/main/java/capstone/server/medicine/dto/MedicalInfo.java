package capstone.server.medicine.dto;

import lombok.Data;

@Data
public class MedicalInfo {
    private String name;
    private String companyName;
    private String depositMethod;
    private String effect;
    private String useMethod;
    private String caution;
    private String imageUrl;
}
