package capstone.server.domain.workout.controller;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.workout.dto.RegisterWorkOutRequest;
import capstone.server.domain.workout.dto.WorkOutCategoryResponse;
import capstone.server.domain.workout.dto.WorkOutRecordResponse;
import capstone.server.domain.workout.service.WorkOutService;
import capstone.server.global.dto.DefaultResponse;
import capstone.server.utils.KaKaoUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/workout")
@RestController
public class WorkOutController {

  private final WorkOutService workOutService;

  @GetMapping("/category")
  public ResponseEntity<?> getAllCategories() {
	try {
	  List<WorkOutCategoryResponse> categoriesDto = workOutService.getAllWorkOutCategories();
	  return ResponseEntity.ok()
			  .body(categoriesDto);
	} catch (HttpClientErrorException e) {
	  return ResponseEntity.status(e.getStatusCode())
			  .body(
					  DefaultResponse.builder()
							  .success(false)
							  .status(e.getStatusCode().value())
							  .message(e.getMessage())
							  .build()
			  );
	}
  }

  @PostMapping()
  public ResponseEntity<?> registerWorkOut(Authentication authentication,
										   @RequestBody RegisterWorkOutRequest workOutRequest) {
	try {
	  KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
	  workOutService.registerWorkOut(kaKaoAccountIdAndUserType, workOutRequest);
	  return ResponseEntity.ok()
			  .body(
					  DefaultResponse.builder() // ErrorResponse 올바를때도 사용하자!
							  .success(true)
							  .status(200)
							  .message(kaKaoAccountIdAndUserType.getKakaoAccountId() + "계정에 " + workOutRequest.getType() + "이 정상적으로 등록 됐습니다.")
							  .build()

			  );

	} catch (HttpClientErrorException e) {
	  return ResponseEntity.status(e.getStatusCode())
			  .body(
					  DefaultResponse.builder()
							  .success(false)
							  .status(e.getStatusCode().value())
							  .message(e.getMessage())
							  .build()
			  );
	}
  }

  @GetMapping("/records")
  public ResponseEntity<?> getAllWorkOutRecords(Authentication authentication,
												@RequestParam(value = "date", required = false) @DateTimeFormat(pattern = "yyyy-MM") String dateStr) {


	try {
	  KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);

	  if (dateStr == null) {
		// 모든 운동력 조회
		List<WorkOutRecordResponse> allWorkOutRecords = workOutService.getAllWorkOutRecords(kaKaoAccountIdAndUserType);
		return ResponseEntity.ok()
				.body(allWorkOutRecords);
	  } else {
		log.info(dateStr);

		int year = Integer.parseInt(dateStr.substring(0, 4));
		int month = Integer.parseInt(dateStr.substring(5));

		// yyyy-MM-dd로 사용
		LocalDate startDate = LocalDate.of(year,month,1);
		LocalDate lastDate = LocalDate.of(year,month,startDate.lengthOfMonth());

		// DB 조회를 위해서 시간대로 변경
		LocalDateTime startDateTime = LocalDateTime.of(startDate, LocalTime.MIN);
		LocalDateTime lastDateTime = LocalDateTime.of(lastDate, LocalTime.MAX);

		log.info("startDateTime : " + startDateTime + " lastDateTime : " + lastDateTime);

		List<WorkOutRecordResponse> workOutRecordsByYearMonth = workOutService.getWorkOutRecordsByYearMonth(kaKaoAccountIdAndUserType, startDateTime,lastDateTime);
		return ResponseEntity.ok()
				.body(workOutRecordsByYearMonth);
	  }

	} catch (HttpClientErrorException e) {
	  return ResponseEntity.status(e.getStatusCode())
			  .body(
					  DefaultResponse.builder()
							  .success(false)
							  .status(e.getStatusCode().value())
							  .message(e.getMessage())
							  .build()
			  );
	}
  }

  @DeleteMapping("/records/{id}")
  public ResponseEntity<?> deleteWorkOutRecord(Authentication authentication,
										 @PathVariable("id") Long id) {

	try {
	  KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
	  Long deletedId = workOutService.deleteWorkOutRecord(kaKaoAccountIdAndUserType, id);

	  if (deletedId == -1L) {
		// 유효하지않는 삭제일 시
		return ResponseEntity.status(HttpStatus.NO_CONTENT)
				.body(
						DefaultResponse.builder()
								.success(false)
								.status(HttpStatus.NO_CONTENT.value())
								.message("["+id+"]은(는) 유효하지 않는 id입니다. 유저 또는 운동력 id를 다시 확인해주세요.")
								.build()
				);

	  }else {
		// 유효한 삭제일 시
		return ResponseEntity.ok()
				.body(
						DefaultResponse.builder()
								.success(true)
								.status(HttpStatus.OK.value())
								.message("["+id+"]을 정상적으로 삭제했습니다.")
								.build()
				);

	  }

	}catch (HttpClientErrorException e) {
	  return ResponseEntity.status(e.getStatusCode())
			  .body(
					  DefaultResponse.builder()
							  .success(false)
							  .status(e.getStatusCode().value())
							  .message(e.getMessage())
							  .build()
			  );
	}
  }

}

