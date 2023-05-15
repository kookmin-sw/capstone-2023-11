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
	try {
	  // 보호자 조회
	  if (!userWardRepository.findById(mealInfoMailDto.getWardId()).isPresent()) return; // 없으면
	  UserWard userWard = userWardRepository.findById(mealInfoMailDto.getWardId()).get();
	  List<UserGuardianUserWard> guardianWards = userGuardianUserWardRepository.findUserGuardianUserWardsByUserWard(userWard);
	  if (guardianWards.isEmpty()) return; // 연관관계가 없으면 메일전송 시스템이 발동하면 안된다.
	  ArrayList<EmailName> emailReceivers = new ArrayList<>();

	  // 메일을 받을 보호자 명단 추리기
	  for (UserGuardianUserWard guardianWard : guardianWards) {
		if(guardianWard.getUserGuardian().getEmail() == null ) continue; //Email이 없으면 넘김
		if(guardianWard.getUserGuardian().getEmail().isBlank()) continue; // 공백일시도 넘김
		emailReceivers.add(
				EmailName.builder()
						.email(guardianWard.getUserGuardian().getEmail())
						.name(guardianWard.getUserGuardian().getName())
						.build()
		);
	  }
	  for (EmailName emailName : emailReceivers) {
		/* 메일에 들어가는 공통 내용 */
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

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
		LocalDateTime dateTime = mealInfoMailDto.getDateTime();
		context.setVariable("datetime", dateTime.toLocalDate());
		// 끼니 정보
		context.setVariable("times", mealInfoMailDto.getTimes());
		// 식사 이미지
		context.setVariable("imageUrl", mealInfoMailDto.getImageUrl());
		// 보호자 이름 변경
		context.setVariable("guardianName", emailName.getName());
		// 영양 정보
		List<FoodInfo> details = mealInfoMailDto.getDetails();
		context.setVariable("meals", details);
		log.info("details \n " + details);
		log.info("userward \n " + userWard.getName());

		// 총 섭취 칼로리 계산
		double totalkcal = 0;
		for (FoodInfo detail : details) {
		  totalkcal += detail.getCalorie();
		}
		context.setVariable("totalKcal", totalkcal);

		String html = springTemplateEngine.process("food-mail", context);
		helper.setText(html, true);

		// 템플릿 이미지 cid로 삽입
		helper.addInline("facebook", new ClassPathResource("static/images/image-1.png"));
//		helper.addInline("twitter", new ClassPathResource("static/images/image-2.png"));
		helper.addInline("linkedin", new ClassPathResource("static/images/image-3.png"));
		helper.addInline("instagram", new ClassPathResource("static/images/image-4.png"));
		helper.addInline("boksiri", new ClassPathResource("static/images/image-5.png"));

		/* --------------------- */

		//수신자 설정
		helper.setTo(emailName.getEmail());
		// TODO 메일 쓰레드로 보내기
		javaMailSender.send(mimeMessage);
		log.info(emailName.getEmail() + "에게 메일 전송 완료" );

	  }
	} catch (MessagingException e) {
	  log.error(e.toString());
	}
  }

  @Override
  public void sendMedicineMail() {
  }
}
