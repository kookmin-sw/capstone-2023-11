package capstone.server.domain.medical.repository;

import capstone.server.entity.MedicalHistoryCategory;
import capstone.server.entity.MedicalHistoryUserWardHas;
import capstone.server.entity.UserWard;
import capstone.server.entity.WorkOutUserWardHas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface MedicalHistoryUserWardHasRepository extends JpaRepository<MedicalHistoryUserWardHas,Long> {
}
