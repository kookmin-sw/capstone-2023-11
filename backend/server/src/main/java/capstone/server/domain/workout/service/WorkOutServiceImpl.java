package capstone.server.domain.workout.service;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.user.repository.UserWardRepository;
import capstone.server.domain.workout.dto.RegisterWorkOutRequest;
import capstone.server.domain.workout.dto.WorkOutCategoryResponse;
import capstone.server.domain.workout.dto.WorkOutRecordResponse;
import capstone.server.domain.workout.enums.WorkOutCategoryEnum;
import capstone.server.domain.workout.repository.WorkOutCategoryRepository;
import capstone.server.domain.workout.repository.WorkOutCategoryUserWardHasRepository;
import capstone.server.entity.UserWard;
import capstone.server.entity.WorkOutCategory;
import capstone.server.entity.WorkOutUserWardHas;
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
  private final WorkOutCategoryUserWardHasRepository workOutCategoryUserWardHasRepository;

  @Override
  public List<WorkOutCategoryResponse> getAllWorkOutCategories() {
	List<WorkOutCategory> categories = workOutCategoryRepository.findAll();
	return categories.stream().map(category -> category.toDto()).collect(Collectors.toList());
  }

  @Override
  public void registerWorkOut(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, RegisterWorkOutRequest workOutRequest) {
	// 유저 조회
	UserWard userWard = userWardRepository.findUserWardByKakaoAccountId(kaKaoAccountIdAndUserType.getKakaoAccountId()).get(); // 여기 에러처리 하기

	// 운동 시간 및 운동 종류 가져오기
	WorkOutCategoryEnum workOut = workOutRequest.getType();

	// 운동 등록하기
	WorkOutUserWardHas saved = workOutCategoryUserWardHasRepository.save(
			WorkOutUserWardHas.builder()
					.hour(workOutRequest.getHour())
					.workOutCategory(workOutCategoryRepository.findWorkOutCategoryByName(workOut).get())
					.userWard(userWard)
					.kcal(workOut.calculateKcal(workOutRequest.getHour()))
					.build()
	);
  }

  @Override
  public List<WorkOutRecordResponse> getAllWorkOutRecords(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType) {
	// 유저 조회하기
	UserWard userWard = userWardRepository.findUserWardByKakaoAccountId(kaKaoAccountIdAndUserType.getKakaoAccountId()).get();

	// 조회한 유저를 기반으로 운동력 찾기
	List<WorkOutUserWardHas> workOutRecords = workOutCategoryUserWardHasRepository.findAllByUserWardOrderByCreatedAtDesc(userWard);

	// Dto로 변경하기
	List<WorkOutRecordResponse> workOutRecordsResponseDto = workOutRecords.stream().map(workOutUserWardHas -> workOutUserWardHas.toDto()).collect(Collectors.toList());

	return workOutRecordsResponseDto;
  }
}
