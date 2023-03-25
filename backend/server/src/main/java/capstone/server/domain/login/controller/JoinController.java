package capstone.server.domain.login.controller;


import capstone.server.domain.login.dto.GuardianJoinRequest;
import capstone.server.domain.login.dto.WardJoinRequest;
import capstone.server.domain.login.enums.MedicalCategory;
import capstone.server.domain.login.service.JoinService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/join")
@Slf4j
@RequiredArgsConstructor
@RestController
public class JoinController {

  private final JoinService joinService;


  @PostMapping("/ward")
  public ResponseEntity<?> wardJoin(@RequestBody WardJoinRequest wardJoinRequest) {
	joinService.joinWard(wardJoinRequest);
	return ResponseEntity.ok().body("성공했수다");
  }

  @PostMapping("/guardian")
  public ResponseEntity<String> guardianJoin(@RequestBody GuardianJoinRequest guardianJoinRequest) {
	Long accountId = joinService.joinGuardian(guardianJoinRequest);
	return ResponseEntity.ok()
			.body( accountId + " 회원가입이 성공 했습니다.");
  }
}
