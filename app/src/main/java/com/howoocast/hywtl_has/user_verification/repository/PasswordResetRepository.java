package com.howoocast.hywtl_has.user_verification.repository;

import com.howoocast.hywtl_has.user_verification.domain.PasswordReset;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetRepository extends JpaRepository<PasswordReset, Long> {

    Optional<PasswordReset> findByEmailAndDeletedAtIsNull(String email);
}
