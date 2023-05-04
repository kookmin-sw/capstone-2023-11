package capstone.server.domain.medical.repository;

import capstone.server.domain.medical.dto.MedicalHistoryInfo;
import capstone.server.entity.MedicalHistoryCategory;
import capstone.server.entity.MedicalHistoryUserWardHas;
import capstone.server.entity.UserWard;
import capstone.server.entity.WorkOutUserWardHas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface MedicalHistoryUserWardHasRepository extends JpaRepository<MedicalHistoryUserWardHas,Long> {

    @Query("SELECT mhc FROM MedicalHistoryUserWardHas mhu JOIN mhu.userWard uw JOIN mhu.medicalHistoryCategory mhc WHERE uw.userId = :userId")
    List<MedicalHistoryCategory> findAllByUserWardUserId(Long userId);

}
