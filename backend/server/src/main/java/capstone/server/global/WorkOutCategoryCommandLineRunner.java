package capstone.server.global;

import capstone.server.domain.workout.enums.WorkOutCategoryEnum;
import capstone.server.domain.workout.repository.WorkOutCategoryRepository;
import capstone.server.entity.WorkOutCategory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Slf4j
@Component
public class WorkOutCategoryCommandLineRunner implements CommandLineRunner {

  private final WorkOutCategoryRepository workOutCategoryRepository;

  @Override
  public void run(String... args) throws Exception {

	for (WorkOutCategoryEnum item : WorkOutCategoryEnum.values()) {
	  if (!workOutCategoryRepository.findWorkOutCategoryByName(item).isPresent()) {
		// 카테고리가 등록 돼 있지 않을 시 등록시키기
		workOutCategoryRepository.save(
				WorkOutCategory.builder()
				.name(item)
				.kor(item.getKor())
				.eng(item.getEng())
				.kcalPerHour(item.getKcalPerHour())
				.description(item.getDescription())
				.build());
		log.info("WorkOutCategory가 등록됐습니다 : " + item.getKor());
	  }
	}
  }
}
