package capstone.server.entity;

import capstone.server.utils.BaseTimeEntity;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Getter @ToString
@Table(name = "medicalHistoryUserWardHas")
@Entity
public class MedicalHistoryUserWardHas extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_ward_user_id")
    private UserWard userWard;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medical_history_category_id")
    private MedicalHistoryCategory medicalHistoryCategory;
}
