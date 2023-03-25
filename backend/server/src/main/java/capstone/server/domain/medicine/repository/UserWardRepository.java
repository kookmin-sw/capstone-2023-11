package capstone.server.domain.medicine.repository;

import capstone.server.entity.UserWard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository

public interface UserWardRepository extends JpaRepository<UserWard, Long> {
    @Query(value = "select uw from UserWard uw where uw.name = :name")
    public UserWard findByName(@Param("name") String name);

}
