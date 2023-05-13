package capstone.server.domain.notification.service;

import capstone.server.domain.notification.dto.MealInfoMailDto;

import javax.mail.MessagingException;

public interface NotificationService {

  void sendFoodMail(MealInfoMailDto mealInfoMailDto);
  void sendMedicineMail() throws MessagingException;
}
