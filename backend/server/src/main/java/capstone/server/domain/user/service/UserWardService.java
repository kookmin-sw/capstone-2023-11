package capstone.server.domain.user.service;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.user.dto.GetDailySummaryDto;
import capstone.server.domain.user.dto.GetUserWardMainInfoResponseDto;
import capstone.server.domain.user.dto.GetWeeklySummaryDto;
import capstone.server.domain.user.dto.UserWardInfoDto;
import org.springframework.stereotype.Service;

@Service
public interface UserWardService {
    public GetUserWardMainInfoResponseDto getUserWardMainInfo(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);
    public GetDailySummaryDto getDailySummary(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);
    public GetWeeklySummaryDto getWeeklySummary(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);
    public String modifyUserWardInfo(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, UserWardInfoDto userWardInfoDto);
}
