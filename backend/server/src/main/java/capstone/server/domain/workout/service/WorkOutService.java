package capstone.server.domain.workout.service;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.workout.dto.RegisterWorkOutRequest;
import capstone.server.domain.workout.dto.WorkOutCategoryResponse;
import capstone.server.domain.workout.dto.WorkOutRecordResponse;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface WorkOutService {
  List<WorkOutCategoryResponse> getAllWorkOutCategories();
  void registerWorkOut(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, RegisterWorkOutRequest workOutRequest);

  List<WorkOutRecordResponse> getAllWorkOutRecords(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);

  List<WorkOutRecordResponse> getWorkOutRecordsByYearMonth(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, LocalDateTime startDate, LocalDateTime lastDate);

  Long deleteWorkOutRecord (KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, Long id);
}
