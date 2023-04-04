package capstone.server.entity;

import capstone.server.utils.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Getter @ToString
@Table(name = "food")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Food {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "meal_id")
  private Meal meal;

  @Column(name= "name")
  private String name;

  @Column(name = "serving_size")
  private double servingSize;

  @Column(name= "calorie")
  private double calorie;

  @Column(name="carbohyborate_total")
  private double carbohyborateTotal;

  @Column(name="carbohyborate_sugar")
  private double carbohyborateSugar;

  @Column(name="carbohyborate_dietary_fiber")
  private double carbohyborateDietaryFiber;

  @Column(name="protein")
  private double protein;

  @Column(name="fat_total")
  private double fatTotal;

  @Column(name = "fat_transfat")
  private double fatTransFat;

  @Column(name = "fat_saturatedfat")
  private double fatSaturatedfat;

  @Column(name= "cholesterol")
  private double cholesterol;

  @Column(name="natrium")
  private double natrium;
}
