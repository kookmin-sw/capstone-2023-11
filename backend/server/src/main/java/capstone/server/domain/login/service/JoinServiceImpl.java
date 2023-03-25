package capstone.server.domain.login.service;

import capstone.server.domain.login.dto.GuardianJoinRequest;
import capstone.server.domain.login.dto.KakaoUserInfoRes;
import capstone.server.domain.login.dto.WardJoinRequest;
import capstone.server.domain.login.enums.MedicalCategory;
import capstone.server.domain.medical.repository.MedicalCategoryRepository;
import capstone.server.domain.medical.repository.MedicalHistoryUserWardHasRepository;
import capstone.server.domain.user.repository.UserGuardianRepository;
import capstone.server.domain.user.repository.UserGuardianUserWardRepository;
import capstone.server.domain.user.repository.UserWardRepository;
import capstone.server.entity.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class JoinServiceImpl implements JoinService{

  private final UserGuardianRepository userGuardianRepository;
  private final UserWardRepository userWardRepository;
  private final UserGuardianUserWardRepository userGuardianUserWardRepository;
  private final MedicalCategoryRepository medicalCategoryRepository;
  private final MedicalHistoryUserWardHasRepository medicalHistoryUserWardHasRepository;
  private final LoginService loginService;

  @Override
  public Long joinGuardian(GuardianJoinRequest guardianJoinRequest) {
	KakaoUserInfoRes userInfo = loginService.getUserInfo(guardianJoinRequest.getKakaoAccesstoken());

	// 혹시 모르니까 유저 중복 체크
	userGuardianRepository.findUserGuardianByKakaoAccountId(userInfo.getId()).ifPresent(userGuardian ->{
			throw new RuntimeException(userInfo.getId() + "는 이미 존재하는 계정입니다.");
  });

	// DB에 저장 Guardian(보호자) 저장
	UserGuardian savedUserGuardian = userGuardianRepository.save(
			UserGuardian.builder()
					.kakaoAccountId(userInfo.getId())
					.name(userInfo.getProperties().getNickname())
					.build()
	);

	// Guardian, ward 연관 등록
	for ( Long kakaoAccountId :guardianJoinRequest.getWardCodes()) {
	  userWardRepository.findUserWardByKakaoAccountId(kakaoAccountId).ifPresent(userWard -> {
		userGuardianUserWardRepository.save(UserGuardianUserWard.builder()
				.userGuardian(savedUserGuardian)
				.userWard(userWard)
				.build());
	  });
	}
	return userInfo.getId();
  }

  @Override
  public Long joinWard(WardJoinRequest wardJoinRequest) {
	KakaoUserInfoRes userInfo = loginService.getUserInfo(wardJoinRequest.getKakaoAccesstoken());

	log.info("userInfo : " + userInfo.toString());

	UserWard savedUserWard = userWardRepository.save(UserWard.builder()
			.kakaoAccountId(userInfo.getId())
			.name(userInfo.getProperties().getNickname())
			.birthday(null)
			.gender(null)
			.weight(wardJoinRequest.getWeight())
			.height(wardJoinRequest.getHeight())
			.drinkings(wardJoinRequest.getDrinkings())
			.smoke(wardJoinRequest.getSmoke())
			.build());


	for (MedicalCategory ill : wardJoinRequest.getIlls()) { // 질병 태그 등록
	  MedicalHistoryCategory medicalHistoryCategory = medicalCategoryRepository.findMedicalHistoryCategoryByName(ill).get();
	  medicalHistoryUserWardHasRepository.save(
			  MedicalHistoryUserWardHas.builder()
					  .medicalHistoryCategory(medicalHistoryCategory)
					  .userWard(savedUserWard)
					  .build()
	  );
	}


	return savedUserWard.getKakaoAccountId();
  }
}
