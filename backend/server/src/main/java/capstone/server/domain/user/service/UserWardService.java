package capstone.server.domain.user.service;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.user.dto.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserWardService {
    public GetUserWardMainInfoResponseDto getUserWardMainInfo(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);
    public GetDailySummaryDto getDailySummary(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);
    public GetWeeklySummaryDto getWeeklySummary(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);
    public String modifyUserWardInfo(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, UserWardInfoDto userWardInfoDto);
    public List<ConnectedGuardian> getConnectedGuardians(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);
}
