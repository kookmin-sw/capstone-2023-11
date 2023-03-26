package capstone.server.entity;

import capstone.server.utils.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter @ToString
@Table(name = "madicine")
@Entity
@NoArgsConstructor
public class Medicine extends BaseTimeEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "effect")
    private String effect;

    @Column(name = "use_method")
    private String useMethod;

    @Column(name = "caution")
    private String caution;

    @Column(name = "deposit_method")
    private String depositMethod;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "due_at")
    private LocalDateTime dueAt;

    @Column(name = "breakfast")
    private Boolean breakfast;

    @Column(name = "lunch")
    private Boolean lunch;

    @Column(name = "dinner")
    private Boolean dinner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_ward_user_id")
    private UserWard userWard;

    @Builder
    public Medicine(Long id, String name, String companyName, String effect, String useMethod, String caution, String depositMethod, String imageUrl, LocalDateTime dueAt, Boolean breakfast, Boolean lunch, Boolean dinner, UserWard userWard) {
        this.id = id;
        this.name = name;
        this.companyName = companyName;
        this.effect = effect;
        this.useMethod = useMethod;
        this.caution = caution;
        this.depositMethod = depositMethod;
        this.imageUrl = imageUrl;
        this.dueAt = dueAt;
        this.breakfast = breakfast;
        this.lunch = lunch;
        this.dinner = dinner;
        this.userWard = userWard;
    }
}
