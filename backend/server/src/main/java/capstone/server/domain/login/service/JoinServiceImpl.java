package capstone.server.domain.login.service;

import capstone.server.domain.login.dto.GuardianJoinRequest;
import capstone.server.domain.login.dto.KakaoUserInfoRes;
import capstone.server.domain.user.repository.UserGuardianRepository;
import capstone.server.entity.UserGuardian;
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
  private final LoginService loginService;

  @Override
  public String joinGuardian(GuardianJoinRequest guardianJoinRequest) {
	KakaoUserInfoRes userInfo = loginService.getUserInfo(guardianJoinRequest.getKakaoAccesstoken());

	// 혹시 모르니까 유저 중복 체크
	userGuardianRepository.findUserGuardianByKakaoAccountId(userInfo.getId()).ifPresent(userGuardian ->{
			throw new RuntimeException(userInfo.getId() + "는 이미 존재하는 계정입니다.");
  });

	// DB에 저장

	userGuardianRepository.save(
			UserGuardian.builder()
			.height(guardianJoinRequest.getHeight())
			.weight(guardianJoinRequest.getWeight())
			.drinkings(guardianJoinRequest.getDrinkings())
			.smoke(guardianJoinRequest.getSmoke())
			.kakaoAccountId(userInfo.getId())
			.profileImageUrl(userInfo.getProperties().getProfileImage())
			.thumbnailImageUrl(userInfo.getProperties().getThumbnailImage())
			.name(userInfo.getProperties().getNickname())
			.birthday(null)
			.gender(userInfo.getGender())
			.phoneNumber(null)
			.build()
	);


	return "SAVED " + userInfo.getId();
  }
}
