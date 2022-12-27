package com.howoocast.hywtl_has.user_verification.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.howoocast.hywtl_has.user_verification.domain.PasswordReset;
import com.howoocast.hywtl_has.user_verification.domain.PasswordResetToken;
import com.howoocast.hywtl_has.user_verification.event.PasswordResetRequestEvent;
import com.howoocast.hywtl_has.user_verification.parameter.PasswordResetParameter;
import com.howoocast.hywtl_has.user_verification.repository.PasswordResetRepository;
import com.howoocast.hywtl_has.user_verification.repository.PasswordResetTokenRepository;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PasswordResetService {

    @Value("${application.mail.invalidate-duration}")
    private String invalidateDuration;
    @Value("${application.mail.expire-time}")
    private String expirationTime;
    private final UserRepository userRepository;
    private final PasswordResetRepository repository;
    private final PasswordResetTokenRepository tokenRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public void reset(PasswordResetParameter parameter) {
        this.resetByUsername(parameter.getUsername());
    }

    public void reset(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new NotFoundException(User.KEY, userId));
        this.resetByUsername(user.getUsername());
    }

    private void resetByUsername(String username) {
        // 기존 코드 무효화
        repository.findByUsername(username)
            .ifPresent(pr -> {
                pr.delete();
                tokenRepository.findByPasswordReset(pr)
                    .ifPresent(PasswordResetToken::delete);
            });

        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new NotFoundException(User.KEY, username));
        user.lock();
        PasswordReset passwordReset = PasswordReset.of(
            user.getEmail(),
            user.getName(),
            user.getUsername()
        );
        repository.save(passwordReset);

        PasswordResetToken token = PasswordResetToken.of(
            passwordReset.getAuthKey(),
            user.getId(),
            passwordReset,
            LocalDateTime.now().plus(Duration.parse(expirationTime))
        );
        tokenRepository.save(token);

        // 메일 발송 이벤트 등록
        eventPublisher.publishEvent(new PasswordResetRequestEvent(passwordReset, token));
    }

    @Transactional(readOnly = true)
    public Boolean validate(String token) {
        PasswordResetToken instance = tokenRepository.findByToken(token).orElse(null);
        if (Objects.isNull(instance)) {
            return false;
        }
        return tokenRepository.existsByExpirationGreaterThanEqual(LocalDateTime.now());
    }
}
