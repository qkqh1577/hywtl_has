package com.howoocast.hywtl_has.login.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.file.service.FileItemService;
import com.howoocast.hywtl_has.login.parameter.LoginUserChangeParameter;
import com.howoocast.hywtl_has.login.parameter.UserValidatePasswordParameter;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.howoocast.hywtl_has.user_verification.domain.PasswordReset;
import com.howoocast.hywtl_has.user_verification.repository.PasswordResetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;
    private final PasswordResetRepository passwordResetRepository;
    private final FileItemService fileItemService;
    @Value("${application.mail.invalidate-duration}")
    private String invalidateDuration;

    @Transactional(readOnly = true)
    public User get(String username) {
        return this.load(username);
    }

    @Transactional
    public void validatePassword(UserValidatePasswordParameter parameter) {
        PasswordReset passwordReset = passwordResetRepository.findByEmail(parameter.getEmail())
            .orElseThrow(() -> new NotFoundException(
                "user_verification.password_reset",
                "email",
                parameter.getEmail()
            ));
        passwordReset.checkValid(invalidateDuration, parameter.getAuthKey());

        User instance = userRepository.findByEmail(parameter.getEmail())
            .orElseThrow(
                () -> new NotFoundException(
                    User.KEY,
                    "email",
                    parameter.getEmail()
                )
            );
        instance.validatePassword(parameter.getPassword());
        passwordReset.delete();
    }

    @Transactional
    public void change(String username, LoginUserChangeParameter parameter) {

        FileItem profile = fileItemService.build(parameter.getProfile());
        User instance = this.load(username);
        log.debug(parameter.getEnglishName());
        log.debug("birth date is null: {}", parameter.getBirthDate() == null);
        log.debug(parameter.getSex());
        instance.change(
            parameter.getEnglishName(),
            parameter.getBirthDate(),
            parameter.getSex(),
            parameter.getMobilePhone(),
            parameter.getPrivateEmail(),
            parameter.getEmergencyPhone(),
            parameter.getRelationship(),
            parameter.getAddress(),
            profile
        );
    }

    private User load(String username) {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new NotFoundException(User.KEY, "username", username));
    }

}
