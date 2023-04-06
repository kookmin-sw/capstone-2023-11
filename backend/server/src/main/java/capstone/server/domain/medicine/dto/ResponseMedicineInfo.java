package capstone.server.domain.medicine.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseMedicineInfo {

    private Long id;

    private String name;

    private String companyName;

    private String effect;

    private String useMethod;

    private String caution;

    private String depositMethod;

    private String imageUrl;

    private LocalDateTime dueAt;
    private int remainDay;

    private Boolean breakfast;

    private Boolean lunch;

    private Boolean dinner;
}
