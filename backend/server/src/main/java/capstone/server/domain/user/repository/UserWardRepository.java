package capstone.server.domain.user.repository;

import capstone.server.entity.UserGuardian;
import capstone.server.entity.UserWard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserWardRepository extends JpaRepository<UserWard,Long> {

  boolean existsByKakaoAccountId(Long kakaoAccountId);
  Optional<UserWard> findUserWardByKakaoAccountId(Long kakaoAccountId);

  @Query("SELECT ug FROM UserGuardianUserWard uguw JOIN uguw.userGuardian ug JOIN uguw.userWard uw WHERE uw.userId = :userId")
  List<UserGuardian> findUserGuardianByUserWardUserId(Long userId);
}
