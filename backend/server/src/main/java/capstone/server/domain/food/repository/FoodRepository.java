package capstone.server.domain.food.repository;

import capstone.server.entity.Food;
import capstone.server.entity.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findAllByMealId(Long mealId);
}
