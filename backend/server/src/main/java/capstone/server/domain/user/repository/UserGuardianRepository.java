package capstone.server.domain.user.repository;

import capstone.server.entity.UserGuardian;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserGuardianRepository extends JpaRepository<UserGuardian,Long> {

  boolean existsByKakaoAccountId(Long kakaoAccountId);
  Optional<UserGuardian> findUserGuardianByKakaoAccountId(Long kakaoAccountId);
}
