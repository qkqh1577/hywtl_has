package com.howoocast.hywtl_has.user_verification.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.user_verification.domain.PasswordReset;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetRepository extends CustomRepository<PasswordReset> {

    Optional<PasswordReset> findByEmail(String email);
}
