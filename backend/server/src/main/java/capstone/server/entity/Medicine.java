package capstone.server.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter @ToString
@Table(name = "madicine")
@Entity
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "effect")
    private String effect;

    @Column(name = "usage")
    private String usage;

    @Column(name = "caution")
    private String caution;

    @Column(name = "interaction")
    private String interaction;

    @Column(name = "side_effect")
    private String sideEffect;

    @Column(name = "deposit_method")
    private String depositMethod;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "due_at")
    private LocalDateTime dueAt;

    @ManyToOne
    @JoinColumn(name = "user+_ward_user_id")
    private UserWard userWard;
}
