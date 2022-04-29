package com.howoocast.hywtl_has.user.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.department.domain.Department;
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
import com.howoocast.hywtl_has.user.view.UserDetailView;
import com.howoocast.hywtl_has.user.view.UserListView;
import com.querydsl.core.types.Predicate;
import java.util.List;
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

    private final UserRepository userRepository;

    private final UserInvitationRepository userInvitationRepository;

    private final PasswordResetRepository passwordResetRepository;

    private final DepartmentRepository departmentRepository;

    @Transactional(readOnly = true)
    public Page<UserListView> page(
        @Nullable Predicate predicate,
        Pageable pageable
    ) {
        return Optional.ofNullable(predicate)
            .map(p -> userRepository.findAll(p, pageable))
            .orElse(userRepository.findAll(pageable))
            .map(UserListView::assemble);
    }

    @Transactional(readOnly = true)
    public List<UserListView> getAll() {
        return userRepository.findAll().stream()
            .map(UserListView::assemble)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserDetailView get(Long id) {
        return UserDetailView.assemble(User.load(userRepository, id));
    }

    @Transactional(readOnly = true)
    public UserDetailView get(String username) {
        return UserDetailView.assemble(
            userRepository.findByUsernameAndDeletedTimeIsNull(username)
                .orElseThrow(NotFoundException::new)
        );
    }

    @Transactional
    public UserDetailView add(UserAddParameter params) {
        UserInvitation userInvitation = UserInvitation.load(userInvitationRepository,
            params.getEmail());
        userInvitation.checkValid(invalidateDuration, params.getAuthKey());

        User user = User.of(
            userRepository,
            params.getUsername(),
            params.getPassword(),
            params.getName(),
            params.getEmail(),
            userInvitation.getDepartment(),
            userInvitation.getUserRole()
        );
        userInvitation.invalidate();
        return UserDetailView.assemble(user);
    }

    @Transactional
    public UserDetailView change(Long id, UserChangeParameter params) {
        User user = User.load(userRepository, id);
        user.change(
            params.getName(),
            params.getEmail(),
            params.getUserRole(),
            Department.load(departmentRepository, params.getDepartmentId())
        );
        return UserDetailView.assemble(user);
    }

    @Transactional
    public UserDetailView changePassword(Long id, UserPasswordChangeParameter params) {
        User user = User.load(userRepository, id);
        user.changePassword(params.getNowPassword(), params.getNewPassword());
        return UserDetailView.assemble(user);
    }

    @Transactional
    public UserDetailView validatePassword(UserValidatePasswordParameter params) {
        PasswordReset passwordReset = PasswordReset.load(passwordResetRepository,
            params.getEmail());
        passwordReset.checkValid(invalidateDuration, params.getAuthKey());

        User user = User.loadByEmail(userRepository, params.getEmail());
        user.validatePassword(params.getPassword());
        passwordReset.invalidate();
        return UserDetailView.assemble(user);
    }
}