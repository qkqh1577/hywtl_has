package com.howoocast.hywtl_has.user.service;

import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.parameter.UserValidatePasswordParameter;
import com.howoocast.hywtl_has.user_verification.domain.PasswordReset;
import com.howoocast.hywtl_has.user_verification.domain.UserInvitation;
import com.howoocast.hywtl_has.user_verification.repository.PasswordResetRepository;
import com.howoocast.hywtl_has.user_verification.repository.UserInvitationRepository;
import com.howoocast.hywtl_has.user.parameter.UserAddParameter;
import com.howoocast.hywtl_has.user.parameter.UserChangeParameter;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.howoocast.hywtl_has.user.parameter.UserPasswordChangeParameter;
import com.howoocast.hywtl_has.user.view.UserView;
import com.howoocast.hywtl_has.user.view.UserShortView;
import com.querydsl.core.types.Predicate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    @Value("${application.mail.invalidate-duration}")
    private String invalidateDuration;

    private final UserRepository repository;

    private final UserInvitationRepository userInvitationRepository;

    private final PasswordResetRepository passwordResetRepository;

    private final DepartmentRepository departmentRepository;

    @Transactional(readOnly = true)
    public Page<UserShortView> page(
        @Nullable Predicate predicate,
        Pageable pageable
    ) {
        return Optional.ofNullable(predicate)
            .map(p -> repository.findAll(p, pageable))
            .orElse(repository.findAll(pageable))
            .map(UserShortView::assemble);
    }

    @Transactional(readOnly = true)
    public List<UserShortView> getAll() {
        return repository.findAll().stream()
            .map(UserShortView::assemble)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserView get(Long id) {
        User instance = this.load(id);
        return UserView.assemble(instance);
    }

    @Transactional(readOnly = true)
    public UserView get(String username) {
        User instance = repository.findByUsername(username)
            .orElseThrow(() -> new NotFoundException("user", String.format("username: %s", username)));
        return UserView.assemble(instance);
    }

    @Transactional
    public UserView add(UserAddParameter params) {
        String email = params.getEmail();
        UserInvitation userInvitation = userInvitationRepository.findByEmail(email)
            .orElseThrow(() -> new NotFoundException(
                "user-verification.user-invitation",
                String.format("email: %s", email)
            ));
        userInvitation.checkValid(invalidateDuration, params.getAuthKey());

        User instance = User.of(
            params.getUsername(),
            params.getPassword(),
            params.getName(),
            params.getEmail(),
            userInvitation.getDepartment(),
            userInvitation.getRole()
        );
        this.checkEmailUsed(instance);
        this.checkUsernameUsed(instance);
        userInvitationRepository.deleteById(userInvitation.getId());
        return UserView.assemble(repository.save(instance));
    }

    @Transactional
    public void change(Long id, UserChangeParameter params) {
        User instance = this.load(id);
        instance.change(
            params.getName(),
            params.getEmail(),
            params.getRole(),
            departmentRepository.findById(params.getDepartment().getId())
                .orElseThrow(() -> new NotFoundException("department", params.getDepartment().getId()))
        );
        this.checkEmailUsed(instance);
    }

    @Transactional
    public void changePassword(Long id, UserPasswordChangeParameter params) {
        User instance = this.load(id);
        instance.changePassword(params.getNowPassword(), params.getNewPassword());
    }

    @Transactional
    public void validatePassword(UserValidatePasswordParameter params) {
        PasswordReset passwordReset = passwordResetRepository.findByEmail(params.getEmail())
            .orElseThrow(() -> new NotFoundException("user-verification.password-reset",
                String.format("email: %s", params.getEmail())));
        passwordReset.checkValid(invalidateDuration, params.getAuthKey());

        User instance = repository.findByEmail(params.getEmail())
            .orElseThrow(
                () -> new NotFoundException(
                    "user",
                    String.format("email: %s", (params.getEmail()))
                )
            );
        instance.validatePassword(params.getPassword());
        passwordResetRepository.deleteById(passwordReset.getId());
    }

    @Transactional
    public void delete(Long id) {
        repository.findById(id).ifPresent(instance ->
            repository.deleteById(id)
        );
    }

    private User load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("user", id));
    }

    private void checkEmailUsed(User instance) {
        String email = instance.getEmail();
        repository.findByEmail(email).ifPresent(target -> {
            if (!Objects.equals(instance.getId(), target.getId())) {
                throw new DuplicatedValueException("user", "email", email);
            }
        });
    }

    private void checkUsernameUsed(User instance) {
        String username = instance.getUsername();
        repository.findByUsername(username).ifPresent(target -> {
            if (!Objects.equals(instance.getId(), target.getId())) {
                throw new DuplicatedValueException("user", "username", username);
            }
        });
    }
}
