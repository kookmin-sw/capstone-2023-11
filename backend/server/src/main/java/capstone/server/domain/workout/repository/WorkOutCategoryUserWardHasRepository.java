package capstone.server.domain.workout.repository;

import capstone.server.domain.user.service.UserWardService;
import capstone.server.entity.UserWard;
import capstone.server.entity.WorkOutUserWardHas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;


public interface WorkOutCategoryUserWardHasRepository extends JpaRepository<WorkOutUserWardHas,Long> {

  List<WorkOutUserWardHas> findAllByUserWardOrderByCreatedAtDesc(UserWard userWard);

  List<WorkOutUserWardHas> findAllByUserWardAndCreatedAtBetweenOrderByCreatedAtDesc(UserWard userWard, LocalDateTime startDate, LocalDateTime lastDate);

  int countByUserWardAndCreatedAtAfter(UserWard userWard, LocalDateTime startOfToday);

  int countByUserWardAndCreatedAtBetween(UserWard userWard, LocalDateTime startOfMonth, LocalDateTime endOfMonth);

  @Query("SELECT DISTINCT CAST(FUNCTION('DATE', e.createdAt) AS java.time.LocalDate) FROM WorkOutUserWardHas e WHERE e.userWard = :userWard")
  List<LocalDate> findDistinctCreatedAtByUserWard(UserWard userWard);
}
