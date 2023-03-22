package capstone.server.domain.user.repository;

import capstone.server.entity.UserWard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserWardRepository extends JpaRepository<UserWard,Long> {

  boolean existsByKakaoAccountId(Long kakaoAccountId);
}
