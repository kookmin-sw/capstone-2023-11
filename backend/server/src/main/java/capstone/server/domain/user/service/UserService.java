package capstone.server.domain.user.service;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.user.dto.GetDailySummaryDto;
import capstone.server.domain.user.dto.GetUserWardMainInfoResponseDto;
import capstone.server.domain.user.dto.GetWeeklySummaryDto;
import org.springframework.stereotype.Service;

// UserGuardian과 UserWard의 중복되는 코드를 모아놓은 인터페이스
public interface UserService {
    public GetUserWardMainInfoResponseDto getUserWardMainInfo(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);
    public GetDailySummaryDto getDailySummary(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);
    public GetWeeklySummaryDto getWeeklySummary(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);
}
