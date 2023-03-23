package capstone.server.domain.login.controller;


import capstone.server.domain.login.dto.GuardianJoinRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/join")
@RequiredArgsConstructor
@RestController
public class JoinController {

  @PostMapping("/guardian")
  public ResponseEntity<String> guardianJoin(@RequestBody GuardianJoinRequest guardianJoinRequest) {

	return ResponseEntity.ok()
			.body("회원가입이 성공 했습니다.");
  }
}
