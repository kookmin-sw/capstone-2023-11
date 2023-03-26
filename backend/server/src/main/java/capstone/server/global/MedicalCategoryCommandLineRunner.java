package capstone.server.global;

import capstone.server.domain.login.enums.MedicalCategory;
import capstone.server.domain.medical.repository.MedicalCategoryRepository;
import capstone.server.entity.MedicalHistoryCategory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Slf4j
@Component
public class MedicalCategoryCommandLineRunner implements CommandLineRunner {

  private final MedicalCategoryRepository medicalCategoryRepository;

  @Override
  public void run(String... args) throws Exception {

	for (MedicalCategory item : MedicalCategory.values()) {
	  if (!medicalCategoryRepository.findMedicalHistoryCategoryByName(item).isPresent()) {
		// 카테고리가 등록 돼 있지 않을 시 등록시키기
		medicalCategoryRepository.save(MedicalHistoryCategory.builder()
				.name(item)
				.kor(item.getKor())
				.eng(item.getEng())
				.description(null)
				.build());
		log.info("medicalCategory가 등록됐습니다 : " + item);
	  }
	}
  }
}
