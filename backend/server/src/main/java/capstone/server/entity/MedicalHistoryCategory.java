package capstone.server.entity;

import capstone.server.utils.BaseTimeEntity;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter @ToString
@Table(name = "medicalHistoryCategory")
@Entity
public class MedicalHistoryCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    /*
     TODO
     병력에 들어가야할 정보 추가해야함
    */

}
