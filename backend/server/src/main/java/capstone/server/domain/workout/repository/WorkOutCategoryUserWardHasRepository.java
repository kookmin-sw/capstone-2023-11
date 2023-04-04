package capstone.server.domain.workout.repository;

import capstone.server.entity.WorkOutUserWardHas;
import org.springframework.data.jpa.repository.JpaRepository;


public interface WorkOutCategoryUserWardHasRepository extends JpaRepository<WorkOutUserWardHas,Long> {

}
