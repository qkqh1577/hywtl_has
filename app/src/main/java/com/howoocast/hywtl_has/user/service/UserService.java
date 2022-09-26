package com.howoocast.hywtl_has.user.service;

import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.file.service.FileItemService;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.parameter.LoginUserChangeParameter;
import com.howoocast.hywtl_has.user.parameter.UserAddParameter;
import com.howoocast.hywtl_has.user.parameter.UserChangeParameter;
import com.howoocast.hywtl_has.user.parameter.UserPasswordChangeParameter;
import com.howoocast.hywtl_has.user.parameter.UserValidatePasswordParameter;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.howoocast.hywtl_has.user.view.UserShortView;
import com.howoocast.hywtl_has.user.view.UserView;
import com.howoocast.hywtl_has.user_verification.domain.PasswordReset;
import com.howoocast.hywtl_has.user_verification.domain.UserInvitation;
import com.howoocast.hywtl_has.user_verification.repository.PasswordResetRepository;
import com.howoocast.hywtl_has.user_verification.repository.UserInvitationRepository;
import com.querydsl.core.types.Predicate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
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

    private final FileItemService fileItemService;

    private final ApplicationEventPublisher eventPublisher;

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
    public List<User> getAll(@Nullable Predicate predicate) {
        if (Objects.isNull(predicate)) {
            return repository.findAll();
        }
        return repository.findAll(predicate);
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
    public void add(UserAddParameter parameter) {
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
        userInvitation.delete();
        instance = repository.save(instance);
        eventPublisher.publishEvent(instance);
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
        passwordReset.delete();
    }

    @Transactional
    public void delete(Long id) {
        this.load(id).delete();
    }

    /* 계정 정보 수정 api */
    @Transactional
    public void edit(String username, LoginUserChangeParameter parameter) {

        FileItem profile = fileItemService.build(parameter.getProfile());
        User loginUser = this.findByUsername(username);
        loginUser.edit(
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

    private User findByUsername(String username) {
        return repository.findByUsername(username)
            .orElseThrow(() -> new NotFoundException(User.KEY, "username", username));
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
