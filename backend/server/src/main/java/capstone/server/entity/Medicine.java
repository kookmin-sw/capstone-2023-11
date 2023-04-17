package capstone.server.entity;

import capstone.server.utils.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter @ToString
@Table(name = "medicine")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Medicine extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "effect", length = 3000)
    private String effect;

    @Column(name = "use_method", length = 3000)
    private String useMethod;

    @Column(name = "caution", length = 3000)
    private String caution;

    @Column(name = "deposit_method", length = 3000)
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

}
