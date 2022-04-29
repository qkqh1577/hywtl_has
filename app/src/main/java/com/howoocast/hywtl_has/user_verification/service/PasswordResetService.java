package com.howoocast.hywtl_has.user_verification.service;

import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.howoocast.hywtl_has.user_verification.domain.PasswordReset;
import com.howoocast.hywtl_has.user_verification.event.PasswordResetRequestEvent;
import com.howoocast.hywtl_has.user_verification.parameter.PasswordResetParameter;
import com.howoocast.hywtl_has.user_verification.repository.PasswordResetRepository;
import com.howoocast.hywtl_has.user_verification.view.PasswordResetView;
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

    private final UserRepository userRepository;

    private final PasswordResetRepository repository;

    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    public PasswordResetView authenticate(String email, String authKey) {
        PasswordReset instance = PasswordReset.load(
            repository,
            email
        );
        instance.checkValid(invalidateDuration, authKey);
        return PasswordResetView.assemble(instance);
    }

    @Transactional
    public PasswordResetView reset(PasswordResetParameter params) {
        String email = params.getEmail();

        User user = User.loadByEmail(userRepository, email);
        user.lock();
        PasswordReset passwordReset = PasswordReset.of(
            repository,
            email,
            user.getName()
        );
        eventPublisher.publishEvent(new PasswordResetRequestEvent(passwordReset));
        return PasswordResetView.assemble(passwordReset);
    }
}
