package com.howoocast.hywtl_has.user.service;

import com.howoocast.hywtl_has.common.service.exception.NotFoundException;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.invitation.domain.UserInvitation;
import com.howoocast.hywtl_has.user.invitation.repository.UserInvitationRepository;
import com.howoocast.hywtl_has.user.service.parameter.UserAddParameter;
import com.howoocast.hywtl_has.user.service.parameter.UserChangeParameter;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.howoocast.hywtl_has.user.service.parameter.UserPasswordChangeParameter;
import com.howoocast.hywtl_has.user.service.view.UserDetailView;
import com.howoocast.hywtl_has.user.service.view.UserListView;
import com.querydsl.core.types.Predicate;
import java.util.Optional;
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

    @Value("${application.user-invitation.invalidate-duration}")
    private String invalidateDuration;

    private final UserRepository userRepository;

    private final UserInvitationRepository userInvitationRepository;

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
    public UserDetailView get(Long id) {
        return UserDetailView.assemble(this.load(id));
    }

    @Transactional
    public UserDetailView add(UserAddParameter params) {
        UserInvitation userInvitation =
            UserInvitation.load(userInvitationRepository::findByEmailAndDeletedTimeIsNull, params.getEmail());
        userInvitation.checkValid(invalidateDuration, params.getAuthKey());

        User user = User.of(
            params.getUsername(),
            params.getPassword(),
            params.getName(),
            params.getEmail(),
            userInvitation.getDepartment(),
            userInvitation.getUserRole()
        );
        user.checkEmailUsed(userRepository::findByEmailAndDeletedTimeIsNull);
        user.checkUsernameUsed(userRepository::findByUsernameAndDeletedTimeIsNull);
        userInvitation.invalidate();
        return this.save(user);
    }

    @Transactional
    public UserDetailView change(Long id, UserChangeParameter params) {
        Department department = departmentRepository.findById(params.getDepartmentId())
            .orElseThrow(NotFoundException::new);
        User user = this.load(id);
        user.change(
            params.getName(),
            params.getEmail(),
            params.getUserRole(),
            department
        );
        user.checkEmailUsed(userRepository::findByEmailAndDeletedTimeIsNull);
        return this.save(user);
    }

    @Transactional
    public UserDetailView changePassword(Long id, UserPasswordChangeParameter params) {
        User user = this.load(id);
        user.changePassword(params.getNowPassword(), params.getNewPassword());
        return this.save(user);
    }

    @Transactional
    public UserDetailView resetPassword(Long id) {
        User user = this.load(id);
        user.lock();
        return this.save(user);
    }

    private User load(Long id) {
        return userRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    private UserDetailView save(User source) {
        return UserDetailView.assemble(userRepository.save(source));
    }
}