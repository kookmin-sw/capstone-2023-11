package capstone.server.domain.user.repository;

import capstone.server.entity.UserGuardian;
import capstone.server.entity.UserWard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserGuardianRepository extends JpaRepository<UserGuardian,Long> {

  boolean existsByKakaoAccountId(Long kakaoAccountId);
  Optional<UserGuardian> findUserGuardianByKakaoAccountId(Long kakaoAccountId);

  @Query("SELECT uw FROM UserGuardianUserWard uguw JOIN uguw.userGuardian ug JOIN uguw.userWard uw WHERE ug.userId = :userId")
  List<UserWard> findUserWardByUserGuardianUserId(Long userId);
}
