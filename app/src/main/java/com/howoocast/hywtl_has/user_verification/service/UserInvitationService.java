package com.howoocast.hywtl_has.user_verification.service;

import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.howoocast.hywtl_has.user_verification.domain.UserInvitation;
import com.howoocast.hywtl_has.user_verification.event.UserInvitationAddEvent;
import com.howoocast.hywtl_has.user_verification.parameter.UserInviteParameter;
import com.howoocast.hywtl_has.user_verification.repository.UserInvitationRepository;
import com.howoocast.hywtl_has.user_verification.view.UserInvitationView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserInvitationService {

    @Value("${application.mail.invalidate-duration}")
    private String invalidateDuration;

    private final UserInvitationRepository repository;

    private final UserRepository userRepository;

    private final DepartmentRepository departmentRepository;

    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    public UserInvitationView authenticate(String email, String authKey) {
        UserInvitation instance = repository.findByEmail(email)
            .orElseThrow(
                () -> new NotFoundException("user_verification.user_invitation", "email", email));
        instance.checkValid(invalidateDuration, authKey);
        return UserInvitationView.assemble(instance);
    }

    @Transactional
    public UserInvitationView invite(UserInviteParameter parameter) {
        String email = parameter.getEmail();
        // ??? ????????? ????????? ?????? ??????
        if (userRepository.findByEmail(email).isPresent()) {
            throw new DuplicatedValueException(User.KEY, "email", email);
        }

        // ?????? ?????? ?????????
        repository.findByEmail(email)
            .ifPresent(UserInvitation::delete);

        UserInvitation userInvitation = UserInvitation.of(
            email,
            parameter.getName(),
            departmentRepository.findById(parameter.getDepartmentId())
                .orElseThrow(() -> new NotFoundException(Department.KEY, parameter.getDepartmentId())),
            parameter.getRole()
        );

        // ?????? ?????? ????????? ??????
        eventPublisher.publishEvent(new UserInvitationAddEvent(userInvitation));
        return UserInvitationView.assemble(repository.save(userInvitation));
    }
}
