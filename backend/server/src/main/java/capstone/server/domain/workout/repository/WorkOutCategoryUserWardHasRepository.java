package capstone.server.domain.workout.repository;

import capstone.server.entity.UserWard;
import capstone.server.entity.WorkOutUserWardHas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface WorkOutCategoryUserWardHasRepository extends JpaRepository<WorkOutUserWardHas,Long> {

  List<WorkOutUserWardHas> findAllByUserWardOrderByCreatedAtDesc(UserWard userWard);

}
