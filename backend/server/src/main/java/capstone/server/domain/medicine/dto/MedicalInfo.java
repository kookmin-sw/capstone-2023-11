package capstone.server.domain.medicine.dto;

import lombok.Builder;
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
    private Boolean breakfast;
    private Boolean lunch;
    private Boolean dinner;
    private int daysToTake;

    @Builder
    public MedicalInfo(String name, String companyName, String depositMethod, String effect, String useMethod, String caution, String imageUrl, Boolean breakfast, Boolean lunch, Boolean dinner, int daysToTake) {
        this.name = name;
        this.companyName = companyName;
        this.depositMethod = depositMethod;
        this.effect = effect;
        this.useMethod = useMethod;
        this.caution = caution;
        this.imageUrl = imageUrl;
        this.breakfast = breakfast;
        this.lunch = lunch;
        this.dinner = dinner;
        this.daysToTake = daysToTake;
    }
}