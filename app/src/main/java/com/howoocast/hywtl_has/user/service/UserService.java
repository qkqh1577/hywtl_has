package com.howoocast.hywtl_has.user.service;

import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.parameter.LoginUserChangeParameter;
import com.howoocast.hywtl_has.user.parameter.UserValidatePasswordParameter;
import com.howoocast.hywtl_has.user.view.LoginUserView;
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
            .orElseThrow(() -> new NotFoundException(User.KEY, "username", username));
        return UserView.assemble(instance);
    }

    @Transactional
    public UserView add(UserAddParameter parameter) {
        String email = parameter.getEmail();
        UserInvitation userInvitation = userInvitationRepository.findByEmail(email)
            .orElseThrow(() -> new NotFoundException(
                "user_verification.user_invitation",
                "email",
                email
            ));
        userInvitation.checkValid(invalidateDuration, parameter.getAuthKey());

        User instance = User.of(
            parameter.getUsername(),
            parameter.getPassword(),
            parameter.getName(),
            parameter.getEmail(),
            userInvitation.getDepartment(),
            userInvitation.getRole()
        );
        this.checkEmailUsed(instance);
        this.checkUsernameUsed(instance);
        userInvitationRepository.deleteById(userInvitation.getId());
        return UserView.assemble(repository.save(instance));
    }

    @Transactional
    public void change(Long id, UserChangeParameter parameter) {
        User instance = this.load(id);
        instance.change(
            parameter.getName(),
            parameter.getEmail(),
            parameter.getRole(),
            departmentRepository.findById(parameter.getDepartment().getId())
                .orElseThrow(() -> new NotFoundException(Department.KEY, parameter.getDepartment().getId()))
        );
        this.checkEmailUsed(instance);
    }

    @Transactional
    public void changePassword(Long id, UserPasswordChangeParameter parameter) {
        User instance = this.load(id);
        instance.changePassword(parameter.getNowPassword(), parameter.getNewPassword());
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

        User instance = repository.findByEmail(parameter.getEmail())
            .orElseThrow(
                () -> new NotFoundException(
                    User.KEY,
                    "email",
                    parameter.getEmail()
                )
            );
        instance.validatePassword(parameter.getPassword());
        passwordResetRepository.deleteById(passwordReset.getId());
    }

    @Transactional
    public void delete(Long id) {
        repository.findById(id).ifPresent(instance ->
            repository.deleteById(id)
        );
    }

    /* 계정 정보 수정 api */
    @Transactional
    public User edit(String name, LoginUserChangeParameter parameter) {
        User loginUser = this.findByName(name);
        loginUser.edit(
            parameter.getEnglishName(),
            parameter.getBirthDate(),
            parameter.getSex(),
            parameter.getMobilePhone(),
            parameter.getPrivateEmail(),
            parameter.getEmergencyPhone(),
            parameter.getRelationship(),
            parameter.getAddress()
        );
        return loginUser;
    }

    private User findByName(String userName) {
        return repository.findByUsername(userName)
            .orElseThrow(() -> new NotFoundException(User.KEY, userName));
    }

    private User load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException(User.KEY, id));
    }

    private void checkEmailUsed(User instance) {
        String email = instance.getEmail();
        repository.findByEmail(email).ifPresent(target -> {
            if (!Objects.equals(instance.getId(), target.getId())) {
                throw new DuplicatedValueException(User.KEY, "email", email);
            }
        });
    }

    private void checkUsernameUsed(User instance) {
        String username = instance.getUsername();
        repository.findByUsername(username).ifPresent(target -> {
            if (!Objects.equals(instance.getId(), target.getId())) {
                throw new DuplicatedValueException(User.KEY, "username", username);
            }
        });
    }
}
