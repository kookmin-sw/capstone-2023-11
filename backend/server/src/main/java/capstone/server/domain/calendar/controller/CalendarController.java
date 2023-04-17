package capstone.server.domain.calendar.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CalendarController {

    @GetMapping(value = "/calendar")
    public ResponseEntity<?> getRecordsDate(Authentication authentication) {


    }
}
