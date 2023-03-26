package capstone.server.domain.medical.repository;

import capstone.server.domain.login.enums.MedicalCategory;
import capstone.server.entity.MedicalHistoryCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MedicalCategoryRepository extends JpaRepository<MedicalHistoryCategory, Long> {
  Optional<MedicalHistoryCategory> findMedicalHistoryCategoryByName(MedicalCategory medicalCategory);
}
