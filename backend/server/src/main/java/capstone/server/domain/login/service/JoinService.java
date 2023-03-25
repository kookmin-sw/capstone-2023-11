package capstone.server.domain.login.service;

import capstone.server.domain.login.dto.GuardianJoinRequest;
import capstone.server.domain.login.dto.WardJoinRequest;

public interface JoinService {
  public Long joinGuardian(GuardianJoinRequest guardianJoinRequest);
  public Long joinWard(WardJoinRequest wardJoinRequest);
}
