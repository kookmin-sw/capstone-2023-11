package capstone.server.domain.workout.repository;

import capstone.server.domain.user.service.UserWardService;
import capstone.server.entity.UserWard;
import capstone.server.entity.WorkOutUserWardHas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;


public interface WorkOutCategoryUserWardHasRepository extends JpaRepository<WorkOutUserWardHas,Long> {

  List<WorkOutUserWardHas> findAllByUserWardOrderByCreatedAtDesc(UserWard userWard);

  List<WorkOutUserWardHas> findAllByUserWardAndCreatedAtBetweenOrderByCreatedAtDesc(UserWard userWard, LocalDateTime startDate, LocalDateTime lastDate);

  Long countByUserWardAndCreatedAtAfter(UserWard userWard, LocalDateTime startOfToday);

  Long countByUserWardAndCreatedAtBetween(UserWard userWard, LocalDateTime startOfMonth, LocalDateTime endOfMonth);


}
