package capstone.server.domain.food.repository;

import capstone.server.entity.Meal;
import capstone.server.entity.UserWard;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {
    Meal findTopByUserWardUserIdOrderByCreatedAtDesc(Long userId);

    List<Meal> findAllByUserWardUserIdOrderByCreatedAtDesc(Long userId);

    List<Meal> findAllByUserWardUserIdAndCreatedAtBetweenOrderByCreatedAtDesc(Long userId, LocalDateTime startDate, LocalDateTime lastDate);

    int countByUserWardAndCreatedAtAfter(UserWard userWard, LocalDateTime startOfToday);

    int countByUserWardAndCreatedAtBetween(UserWard userWard, LocalDateTime startOfMonth, LocalDateTime endOfMonth);

    List<LocalDateTime> findDistinctCreatedAtByUserWard(UserWard userWard);
    

}
