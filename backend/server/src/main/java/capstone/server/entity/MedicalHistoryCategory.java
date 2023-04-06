package capstone.server.entity;

import capstone.server.domain.login.enums.MedicalCategory;
import capstone.server.utils.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter @ToString
@Table(name = "medicalHistoryCategory")
@Entity
public class MedicalHistoryCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    @Enumerated(EnumType.STRING)
    private MedicalCategory name;

    private String kor;

    private String eng;

    private String description;

    /*
     TODO
     병력에 들어가야할 정보 추가해야함
    */

}
