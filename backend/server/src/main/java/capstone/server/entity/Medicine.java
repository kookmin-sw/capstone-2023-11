package capstone.server.entity;

import capstone.server.utils.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter @ToString
@Table(name = "madicine")
@Entity

public class Medicine extends BaseTimeEntity {

    @Builder
    public Medicine(String name, String companyName, String effect, String useMethod, String caution, String depositMethod, String imageUrl, LocalDateTime dueAt, UserWard userWard) {
        this.name = name;
        this.companyName = companyName;
        this.effect = effect;
        this.useMethod = useMethod;
        this.caution = caution;
        this.depositMethod = depositMethod;
        this.imageUrl = imageUrl;
        this.dueAt = dueAt;
        this.userWard = userWard;
    }

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_ward_user_id")
    private UserWard userWard;
}
