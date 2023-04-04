package capstone.server.domain.workout.controller;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.workout.dto.RegisterWorkOutRequest;
import capstone.server.domain.workout.dto.WorkOutCategoryDtoResponse;
import capstone.server.domain.workout.service.WorkOutService;
import capstone.server.global.dto.ErrorResponse;
import capstone.server.utils.KaKaoUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/workout")
@RestController
public class WorkOutController {

  private final WorkOutService workOutService;

  @GetMapping("/category")
  public ResponseEntity<?> getAllCategories(){
    try {
      List<WorkOutCategoryDtoResponse> categoriesDto = workOutService.getAllWorkOutCategories();
      return ResponseEntity.ok()
              .body(categoriesDto);
    }catch (HttpClientErrorException e ){
      return ResponseEntity.status(e.getStatusCode())
              .body(
                      ErrorResponse.builder()
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

    KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);

  }
}
