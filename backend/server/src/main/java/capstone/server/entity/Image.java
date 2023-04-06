package capstone.server.entity;

import capstone.server.utils.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@ToString
@Table(name = "image")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Image extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "tile")
    private String title;

    @Column(name = "url")
    private String url;
}
