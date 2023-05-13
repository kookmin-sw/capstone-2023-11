package capstone.server.domain.user.service;

import capstone.server.domain.user.dto.*;
import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UserWardServiceImpl implements UserWardService{
    private final UserService userService;

    public GetUserWardMainInfoResponseDto getUserWardMainInfo(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType) throws HttpClientErrorException {
        return userService.getUserWardMainInfo(kaKaoAccountIdAndUserType);
    }
    public GetDailySummaryDto getDailySummary(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType) throws HttpClientErrorException {
        return userService.getDailySummary(kaKaoAccountIdAndUserType);
    }
    public GetWeeklySummaryDto getWeeklySummary(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType) throws HttpClientErrorException {
        return userService.getWeeklySummary(kaKaoAccountIdAndUserType);
    }
}
