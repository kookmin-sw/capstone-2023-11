package capstone.server.domain.workout.service;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.user.repository.UserWardRepository;
import capstone.server.domain.workout.dto.RegisterWorkOutRequest;
import capstone.server.domain.workout.dto.WorkOutCategoryResponse;
import capstone.server.domain.workout.repository.WorkOutCategoryRepository;
import capstone.server.entity.UserWard;
import capstone.server.entity.WorkOutCategory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class WorkOutServiceImpl implements WorkOutService{

  private final WorkOutCategoryRepository workOutCategoryRepository;
  private final UserWardRepository userWardRepository;

  @Override
  public List<WorkOutCategoryResponse> getAllWorkOutCategories() {
	List<WorkOutCategory> categories = workOutCategoryRepository.findAll();
	return categories.stream().map(category -> category.toDto()).collect(Collectors.toList());
  }

  @Override
  public void registerWorkOut(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, RegisterWorkOutRequest workOutRequest) {
	// 운동 등록
	UserWard userWard = userWardRepository.findUserWardByKakaoAccountId(kaKaoAccountIdAndUserType.getKakaoAccountId()).get(); // 여기 에러처리 하기


  }
}
