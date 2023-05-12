package capstone.server.domain.user.service;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.user.dto.GetDailySummaryDto;
import capstone.server.domain.user.dto.GetUserWardMainInfoResponseDto;
import capstone.server.domain.user.dto.GetWeeklySummaryDto;

public interface UserGuardianService {

    public GetUserWardMainInfoResponseDto getUserWardMainInfo(Long userWardKakaoAccountId);
    public GetDailySummaryDto getDailySummary(Long userWardKakaoAccountId);
    public GetWeeklySummaryDto getWeeklySummary(Long userWardKakaoAccountId);
}
