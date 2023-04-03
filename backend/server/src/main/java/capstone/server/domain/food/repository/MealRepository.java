package capstone.server.domain.food.repository;

import capstone.server.entity.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {
    Meal findTopByOrderByCreatedAtDesc();
}
