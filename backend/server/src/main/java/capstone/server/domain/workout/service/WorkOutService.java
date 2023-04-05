package capstone.server.domain.workout.service;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.workout.dto.RegisterWorkOutRequest;
import capstone.server.domain.workout.dto.WorkOutCategoryResponse;
import capstone.server.domain.workout.dto.WorkOutRecordResponse;

import java.util.List;

public interface WorkOutService {
  List<WorkOutCategoryResponse> getAllWorkOutCategories();
  void registerWorkOut(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, RegisterWorkOutRequest workOutRequest);

  List<WorkOutRecordResponse> getAllWorkOutRecords(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);
}
