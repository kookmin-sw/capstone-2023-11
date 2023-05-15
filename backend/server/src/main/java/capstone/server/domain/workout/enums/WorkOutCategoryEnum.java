package capstone.server.domain.workout.enums;

import lombok.Getter;


@Getter
public enum WorkOutCategoryEnum {

  WALKING("walking","걷기",240,"걷기에 대한 설명"),
  RUNNING("running","달리기",650,"달리기에 대한 설명"),
  YOGA("yoga","요가",240,"요가에 대한 설명"),
  PILATES("pilates","필라테스",240,"필라테스에 대한 설명"),
  GATEBALL("gateball","게이트볼",300,"게이트볼에 대한 설명"),
  BICYCLING("bicycling","자전거",400,"자전거에 대한 설명"),
  HIKING("hiking","등산",450,"등산에 대한 설명"),
  GOLF("golf","골프",300,"골프에 대한 설명"),
  DANCE_SPORTS("dance sports","댄스 스포츠",450,"댄스 스포츠에 대한 설명"),
  WEIGHTLIFTING("weightlifting","웨이트",300,"웨이트에 대한 설명"),
  TENNIS("tennis","테니스",450,"테니스에 대한 설명"),
  BADMINTON("badminton","배드민턴",370,"배드민턴에 대한 설명"),
  SQUASH("squash","스쿼시",650,"스쿼시에 대한 설명"),
  BOXING("boxing","복싱",700,"복싱에 대한 설명"),
  STRETCHING("stretching","스트레칭",80,"스트레칭에 대한 설명"),
  AEROBICS("aerobics","에어로빅",450,"에어로빅에 대한 설명"),
  RECREATION("recreation","당구, 탁구",120,"레크리에이션(당구, 탁구)에 대한 설명"),
  SURFING("surfing","서핑",170,"서핑에 대한 설명");


  private String eng;
  private String kor;
  private Integer kcalPerHour;
  private String description;

  WorkOutCategoryEnum(String eng, String kor) {
	this.eng = eng;
	this.kor = kor;
	this.description = "testing";
  }

  WorkOutCategoryEnum(String eng, String kor, Integer kcalPerHour, String description) {
	this.eng = eng;
	this.kor = kor;
    this.kcalPerHour = kcalPerHour;
	this.description = description;
  }

  public Integer calculateKcal(int hour) {
    return kcalPerHour * hour;
  }


}
