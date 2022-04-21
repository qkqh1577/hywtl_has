package com.howoocast.hywtl_has.personnel.repository;

import com.howoocast.hywtl_has.personnel.domain.Personnel;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonnelRepository extends JpaRepository<Personnel, Long> {

    Optional<Personnel> findByIdAndDeletedTimeIsNull(Long id);
}
