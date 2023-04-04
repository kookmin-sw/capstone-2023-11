package capstone.server.domain.workout.repository;

import capstone.server.domain.workout.enums.WorkOutCategoryEnum;
import capstone.server.entity.WorkOutCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorkOutCategoryRepository extends JpaRepository<WorkOutCategory,Long> {

  Optional<WorkOutCategory> findWorkOutCategoryByName(WorkOutCategoryEnum name);
}
