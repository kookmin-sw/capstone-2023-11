package capstone.server.domain.notification.service;

import capstone.server.domain.food.dto.FoodInfo;
import capstone.server.domain.notification.dto.MealInfoMailDto;
import capstone.server.domain.notification.dto.EmailName;
import capstone.server.domain.user.repository.UserGuardianUserWardRepository;
import capstone.server.domain.user.repository.UserWardRepository;
import capstone.server.entity.UserGuardianUserWard;
import capstone.server.entity.UserWard;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
  private final JavaMailSender javaMailSender;
  private final SpringTemplateEngine springTemplateEngine;
  private final UserGuardianUserWardRepository userGuardianUserWardRepository;
  private final UserWardRepository userWardRepository;
  @Value("${spring.mail.username}")
  String senderEmailAdderess;


  @Override
  public void sendFoodMail(MealInfoMailDto mealInfoMailDto) {
	MimeMessage mimeMessage = javaMailSender.createMimeMessage();
	try {
	  MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

	  // 보호자 조회
	  if (!userWardRepository.findById(mealInfoMailDto.getWardId()).isPresent()) return; // 없으면
	  UserWard userWard = userWardRepository.findById(mealInfoMailDto.getWardId()).get();
	  List<UserGuardianUserWard> guardianWards = userGuardianUserWardRepository.findUserGuardianUserWardsByUserWard(userWard);
	  ArrayList<EmailName> emailReceivers = new ArrayList<>();

	  // 메일을 받을 보호자 명단 추리기
	  for (UserGuardianUserWard guardianWard : guardianWards) {
		emailReceivers.add(
				EmailName.builder()
						.email(guardianWard.getUserGuardian().getEmail())
						.name(guardianWard.getUserGuardian().getName())
						.build()
		);
	  }

	  /* 메일에 들어가는 공통 내용 */
	  String emailTitle = userWard.getName() + "님이 식사 정보를 기록하셨습니다.";
	  //메일 제목 설정
	  helper.setSubject(emailTitle);
	  //발신자 설정
	  helper.setFrom(senderEmailAdderess);

	  // 메일 템플릿
	  Context context = new Context(); // 타임리프 컨텍스트

	  // 시니어 이름
	  context.setVariable("wardName", userWard.getName());

	  // 식사 생성일
	  context.setVariable("datetime", mealInfoMailDto.getDateTime());

	  // 식사 이미지
	  context.setVariable("imageUrl", mealInfoMailDto.getImageUrl());

	  String html = springTemplateEngine.process("food-mail", context);
	  helper.setText(html, true);

	  // 영양 정보
	  List<FoodInfo> details = mealInfoMailDto.getDetails();
	  context.setVariable("meals", details);

	  // 총 섭취 칼로리 계산
	  double totalkcal = 0;
	  for (FoodInfo detail : details) {
		totalkcal += detail.getCalorie();
	  }
	  context.setVariable("totalKcal", totalkcal);

	  // 템플릿 이미지 cid로 삽입
	  helper.addInline("image1", new ClassPathResource("static/images/image-1.png"));
	  helper.addInline("image2", new ClassPathResource("static/images/image-2.png"));
	  helper.addInline("image3", new ClassPathResource("static/images/image-3.png"));
	  helper.addInline("image4", new ClassPathResource("static/images/image-4.png"));
	  helper.addInline("image5", new ClassPathResource("static/images/image-5.png"));

	  /* --------------------- */


	  for (EmailName emailName : emailReceivers) {
		//수신자 설정
		helper.setTo(emailName.getEmail());
		// 보호자 이름 변경
		context.setVariable("guardianName", emailName.getName());
		// TODO 메일 쓰레드로 보내기
		javaMailSender.send(mimeMessage);

	  }


	} catch (MessagingException e) {
		log.error(e.toString());
	}

  }

  @Override
  public void sendMedicineMail() {

  }
}
