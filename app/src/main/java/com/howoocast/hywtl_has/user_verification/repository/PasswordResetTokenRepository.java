package com.howoocast.hywtl_has.user_verification.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.user_verification.domain.PasswordReset;
import com.howoocast.hywtl_has.user_verification.domain.PasswordResetToken;
import java.time.LocalDateTime;
import java.util.Optional;

public interface PasswordResetTokenRepository extends CustomRepository<PasswordResetToken> {

    Optional<PasswordResetToken> findByToken(String token);

    Boolean existsByExpirationGreaterThanEqual(LocalDateTime expiration);

    Optional<PasswordResetToken> findByPasswordReset(PasswordReset pr);
}
