package capstone.server.domain.user.repository;

import capstone.server.entity.UserGuardian;
import capstone.server.entity.UserGuardianUserWard;
import capstone.server.entity.UserWard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserGuardianUserWardRepository extends JpaRepository<UserGuardianUserWard,Long> {
    boolean existsByUserGuardianAndUserWard(UserGuardian userGuardian, UserWard userWard);
}
