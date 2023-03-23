package capstone.server.domain.login.service;

import capstone.server.domain.login.dto.GuardianJoinRequest;

public interface JoinService {
  public String joinGuardian(GuardianJoinRequest guardianJoinRequest);
}
