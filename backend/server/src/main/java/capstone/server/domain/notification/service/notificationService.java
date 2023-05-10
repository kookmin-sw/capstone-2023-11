package capstone.server.domain.notification.service;

import capstone.server.domain.notification.dto.MealInfoMailDto;

import javax.mail.MessagingException;

public interface notificationService {

  void sendFoodMail(MealInfoMailDto mealInfoMailDto) throws MessagingException;
  void sendMedicineMail() throws MessagingException;
}
