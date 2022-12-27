package com.howoocast.hywtl_has.user_verification.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.user_verification.domain.PasswordReset;
import java.util.Optional;

public interface PasswordResetRepository extends CustomRepository<PasswordReset> {

    Optional<PasswordReset> findByUsername(String username);

    Optional<PasswordReset> findByEmail(String email);
}
