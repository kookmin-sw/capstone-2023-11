package capstone.server.domain.workout.enums;

import lombok.Getter;


@Getter
public enum WorkOutCategoryEnum {

  WALKING("walking","걷기",240,"매일 조금씩 걷기를 하면 혈액순환을 돕고 체중감량에도 효과적입니다. 그러나 급격한 증가는 관절에 부담을 줄 수 있으니 천천히 시작하는 것이 좋습니다."),
  RUNNING("running","달리기",650,"심혈관기능을 향상시키고 체지방을 감량시키며 건강한 신체를 유지하는 데 도움이 됩니다. 하지만 부상에 주의해야 하며, 충분한 스트레칭과 안정적인 신발 착용이 필수입니다."),
  YOGA("yoga","요가",240,"몸과 마음의 안정을 위한 스포츠로, 유연성과 균형감각을 향상시키며 스트레스를 줄여줍니다. 하지만 부상을 예방하기 위해 올바른 자세와 호흡법을 유지해야 합니다."),
  PILATES("pilates","필라테스",240,"근력강화와 유연성 향상에 효과적이며, 특히 척추 근육을 강화하여 자세 개선에 도움이 됩니다. 하지만 올바른 자세와 호흡법을 유지하며 수업 전에 충분한 스트레칭이 필요합니다."),
  GATEBALL("gateball","게이트볼",300,"고령자에게 적합한 스포츠로, 친목도모와 체력증진을 목적으로 합니다. 하지만 과도한 운동으로 인한 부상을 방지하기 위해 충분한 스트레칭과 적절한 운동량을 유지해야 합니다."),
  BICYCLING("bicycling","자전거",400,"심혈관 기능 향상과 체지방 감량에 효과적이며, 대중교통 대안으로도 많이 이용됩니다. 하지만 안전한 운전 습관과 적절한 장비 사용이 필수입니다."),
  HIKING("hiking","등산",450,"체력 강화와 스트레스 해소에 도움이 되며, 아름다운 자연을 감상할 수 있습니다. 그러나 미끄러운 지형에서의 안전에 주의해야 하며, 충분한 수분섭취와 적절한 옷차림이 필요합니다."),
  GOLF("golf","골프",300,"전신근력과 균형감각을 향상시키며 스트레스를 줄여줍니다. 그러나 스윙 동작에 따른 부상에 주의해야 하며, 충분한 스트레칭과 안전한 운동 환경이 필요합니다."),
  DANCE_SPORTS("dance sports","댄스 스포츠",450,"쉽게 접근 가능하며, 즐겁게 운동할 수 있는 스포츠로, 유연성과 균형감각을 향상시키며 체력을 증진시킵니다. 하지만 강도에 따라 부상의 위험이 있으므로 적절한 강도와 적절한 신발을 선택해야 합니다."),
  WEIGHTLIFTING("weightlifting","웨이트",300,"근력 강화와 체지방 감량에 효과적이며, 특히 근육의 발달과 성형에 도움이 됩니다. 하지만 부상에 주의해야 하며, 적절한 기구 사용과 충분한 스트레칭이 필수입니다."),
  TENNIS("tennis","테니스",450,"전신 근력과 균형감각을 향상시키며 심혈관 기능을 향상시킵니다. 그러나 강도가 높아 부상 위험이 있으므로 충분한 스트레칭과 안전한 운동 환경이 필요합니다."),
  BADMINTON("badminton","배드민턴",370,"전신 근력과 균형감각을 향상시키며 심혈관 기능을 향상시킵니다. 그러나 활동량이 많고 전신을 사용하는 만큼 무리하지 않는 것이 중요하고 손목과 어깨 허리를 시작 전 스트레칭해주어야 합니다."),
  SQUASH("squash","스쿼시",650,"전신 근력과 균형감각을 향상시키며 심혈관 기능을 향상시킵니다. 그러나 강도가 높아 부상 위험이 있으므로 충분한 스트레칭과 안전한 운동 환경이 필요합니다."),
  BOXING("boxing","복싱",700,"심혈관 기능을 향상시키며 체지방 감량에도 효과적입니다. 그러나 부상에 주의해야 하며, 적절한 용구 사용과 안전한 운동 환경이 필수입니다."),
  STRETCHING("stretching","스트레칭",80,"유연성을 향상시켜 근육을 강화하고, 부상 예방과 회복에 도움이 됩니다. 그러나 과도한 스트레칭으로 인한 부상을 예방하기 위해 적절한 스트레칭 방법과 강도를 유지해야 합니다."),
  AEROBICS("aerobics","에어로빅",450,"심혈관 기능을 향상시키며 체지방 감량에도 효과적입니다. 그러나 적절한 기구와 의류 사용, 충분한 수분 섭취가 필요하며, 과도한 운동으로 인한 부상을 예방해야 합니다."),
  RECREATION("recreation","당구, 탁구",120,"전신 근력과 집중력을 향상시키며, 심리적 안정감을 주는 스포츠입니다. 그러나 장시간하는 스포츠이므로 자세 교정과 충분한 스트레칭이 필요합니다."),
  SURFING("surfing","서핑",170,"근력과 유연성을 향상시키며, 스트레스를 해소해주는 스포츠입니다. 그러나 파도와 바위 등 위험한 요소들이 존재하므로 충분한 안전장비를 준비하고 안전한 장소에서 운동해야 합니다. 또한 수온과 조건에 따라 체온 조절에 주의해야 합니다.");


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
