package capstone.server.domain.user.service;

import capstone.server.domain.calendar.dto.GetRecordsDateResponseDto;
import capstone.server.domain.food.dto.GetFoodInfoResponseDto;
import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.medicine.dto.GetMedicineInfoResponseDto;
import capstone.server.domain.user.dto.ConnectedWard;
import capstone.server.domain.user.dto.GetDailySummaryDto;
import capstone.server.domain.user.dto.GetUserWardMainInfoResponseDto;
import capstone.server.domain.user.dto.GetWeeklySummaryDto;
import capstone.server.domain.workout.dto.WorkOutRecordResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface UserGuardianService {

    public GetUserWardMainInfoResponseDto getUserWardMainInfo(Long userWardKakaoAccountId);
    public GetDailySummaryDto getDailySummary(Long userWardKakaoAccountId);
    public GetWeeklySummaryDto getWeeklySummary(Long userWardKakaoAccountId);
    public List<ConnectedWard> getConnectedWards(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType);
    public GetFoodInfoResponseDto getFoodInfo(Long userWardKakaoAccountId);
    public GetFoodInfoResponseDto getFoodInfoByYearMonth(Long userWardKakaoAccountId, LocalDateTime startDate, LocalDateTime lastDate);
    List<WorkOutRecordResponse> getAllWorkOutRecords(Long userWardKakaoAccountId);
    List<WorkOutRecordResponse> getWorkOutRecordsByYearMonth(Long userWardKakaoAccountId, LocalDateTime startDate, LocalDateTime lastDate);
    public GetMedicineInfoResponseDto getMedicineInfo(Long userWardKakaoAccountId);
    public String connectWard(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, Long userWardKakaoAccountId);
    public String disconnectWard(KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType, Long userWardKakaoAccountId);
    public GetRecordsDateResponseDto getRecordsDate(Long userWardKakaoAccountId);
}
