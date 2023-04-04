package capstone.server.domain.workout.service;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.workout.dto.RegisterWorkOutRequest;
import capstone.server.domain.workout.dto.WorkOutCategoryDtoResponse;

import java.util.List;

public interface WorkOutService {
  List<WorkOutCategoryDtoResponse> getAllWorkOutCategories();
  void registerWorkOut(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, RegisterWorkOutRequest workOutRequest);
}
