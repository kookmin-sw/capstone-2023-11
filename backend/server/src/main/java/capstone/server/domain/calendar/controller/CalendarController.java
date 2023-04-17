package capstone.server.domain.calendar.controller;

import capstone.server.domain.calendar.dto.GetRecordsDateResponseDto;
import capstone.server.domain.calendar.service.CalendarService;
import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.utils.KaKaoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CalendarController {

    @Autowired
    CalendarService calendarService;
    @GetMapping(value = "/calendar")
    public ResponseEntity<?> getRecordsDate(Authentication authentication) {
        KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoUtil.authConvertIdAndTypeDto(authentication);
        GetRecordsDateResponseDto result = calendarService.getRecordsDate(kaKaoAccountIdAndUserType);

        return ResponseEntity.ok().body(result);
    }
}
