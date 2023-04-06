package capstone.server.sample.controller;

import capstone.server.domain.user.repository.UserWardRepository;
import capstone.server.entity.UserWard;
import capstone.server.utils.JwtUtil;
import capstone.server.utils.UserType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class TestServiceImpl{
  private final UserWardRepository userWardRepository;

  @Value("${jwt.secret}")
  private String secretKey;

  private Long TempExpiredAtMs = 1000L * 60 * 60 * 3; //3시간

  public String temporaryJWTcreator() {
	// TODO 임시회원등록을 시키고 -> ward로
	// TODO JWT 발급받아서 줘야함

	// 임시 유저 SAVE
	Random random = new Random();
	long kakaoAccoutId = Math.abs(random.nextLong()) % 10000000000L;
	userWardRepository.save(UserWard.builder()
			.kakaoAccountId(kakaoAccoutId)
			.name("홍길동")
			.build());

	// JWT 생성
	String jwt = JwtUtil.createJwt(UserType.USER_WARD, kakaoAccoutId, secretKey, TempExpiredAtMs);


	return jwt;
  }
}
