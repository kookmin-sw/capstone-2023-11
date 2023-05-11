package capstone.server.domain.notification.service;

import capstone.server.domain.notification.dto.MealInfoMailDto;
import capstone.server.domain.notification.dto.EmailName;
import capstone.server.domain.user.repository.UserGuardianUserWardRepository;
import capstone.server.domain.user.repository.UserWardRepository;
import capstone.server.entity.UserGuardianUserWard;
import capstone.server.entity.UserWard;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
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
  public void sendFoodMail(MealInfoMailDto mealInfoMailDto) throws MessagingException {
	MimeMessage mimeMessage = javaMailSender.createMimeMessage();
	MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

	// 보호자 조회
	if (!userWardRepository.findById(mealInfoMailDto.getWardId()).isPresent()) return; // 없으면
	UserWard userWard = userWardRepository.findById(mealInfoMailDto.getWardId()).get();
	List<UserGuardianUserWard> guardianWards = userGuardianUserWardRepository.findUserGuardianUserWardsByUserWard(userWard);
	ArrayList<EmailName> emailReceivers = new ArrayList<>();

	// 메일을 받을 보호자 명단 추리기
	for ( UserGuardianUserWard guardianWard : guardianWards) {
	  emailReceivers.add(
			  EmailName.builder()
					  .email(guardianWard.getUserGuardian().getEmail())
					  .name(guardianWard.getUserGuardian().getName())
					  .build()
	  );
	}

	for (EmailName emailName : emailReceivers) {
	  //메일 제목 설정
	  String emailTitle = userWard.getName() + "님이 식사 정보를 기록하셨습니다.";
	  helper.setSubject(emailTitle);
	  //수신자 설정
	  helper.setTo(emailName.getEmail());
	  //발신자 설정
	  helper.setFrom(senderEmailAdderess);

	  //메일 템플릿
//	  Context context = new Context(); // 타임리프 컨텍스트
//	  context.setVariable("managerName",managerDto.getName());

//	  String html = springTemplateEngine.process("mail",context);
//	  helper.setText(html,true);
//
//	  // 템플릿 이미지 cid로 삽입
//	  helper.addInline("image1", new ClassPathResource("static/images/image-1.png"));
//	  helper.addInline("image2", new ClassPathResource("static/images/image-2.png"));
//	  helper.addInline("image3", new ClassPathResource("static/images/image-3.png"));
//	  helper.addInline("image4", new ClassPathResource("static/images/image-4.png"));
//	  helper.addInline("image5", new ClassPathResource("static/images/image-5.png"));

	  javaMailSender.send(mimeMessage);
	}


  }

  @Override
  public void sendMedicineMail() {

  }
}
