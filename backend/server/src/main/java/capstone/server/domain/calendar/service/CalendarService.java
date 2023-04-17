package capstone.server.domain.calendar.service;

import capstone.server.domain.calendar.dto.GetRecordsDateResponseDto;
import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import org.springframework.stereotype.Service;

@Service
public interface CalendarService {

    public GetRecordsDateResponseDto getRecordsDate(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);
}
