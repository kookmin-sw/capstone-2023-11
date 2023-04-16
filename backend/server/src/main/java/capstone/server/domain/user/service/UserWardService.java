package capstone.server.domain.user.service;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.user.dto.GetUserWardMainInfoResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface UserWardService {
    public GetUserWardMainInfoResponseDto getUserWardMainInfo(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);
}
