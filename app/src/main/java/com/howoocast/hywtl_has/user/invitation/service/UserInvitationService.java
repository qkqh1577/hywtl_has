package com.howoocast.hywtl_has.user.invitation.service;

import com.howoocast.hywtl_has.common.service.exception.NotFoundException;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.user.invitation.domain.UserInvitation;
import com.howoocast.hywtl_has.user.invitation.event.UserInvitationAddEvent;
import com.howoocast.hywtl_has.user.invitation.repository.UserInvitationRepository;
import com.howoocast.hywtl_has.user.invitation.service.exception.UserInvitationAuthenticationFailureException;
import com.howoocast.hywtl_has.user.invitation.service.view.UserInvitationView;
import com.howoocast.hywtl_has.user.invitation.util.MailAuthKeyManager;
import com.howoocast.hywtl_has.user.invitation.service.parameter.UserInviteParameter;
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

    @Value("${application.user-invitation.invalidate-duration}")
    private String invalidateDuration;

    private final UserInvitationRepository userInvitationRepository;

    private final DepartmentRepository departmentRepository;

    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public UserInvitationView invite(UserInviteParameter params) {
        invalidateIfExists(params.getEmail());
        UserInvitation userInvitation = UserInvitation.of(
            params.getEmail(),
            params.getName(),
            departmentRepository.findById(params.getDepartmentId()).orElseThrow(NotFoundException::new),
            params.getUserRole()
        );

        userInvitationRepository.save(userInvitation);
        eventPublisher.publishEvent(new UserInvitationAddEvent(userInvitation));
        return UserInvitationView.assemble(userInvitation);
    }

    @Transactional
    public UserInvitationView authenticate(String email, String authKey) {
        UserInvitation userInvitation = userInvitationRepository.findByEmailAndDeletedTimeIsNull(email)
            .orElseThrow(NotFoundException::new);
        if (!MailAuthKeyManager.authenticate(userInvitation, invalidateDuration, authKey)) {
            throw new UserInvitationAuthenticationFailureException();
        }
        return UserInvitationView.assemble(userInvitation);
    }

    private void invalidateIfExists(String email) {
        userInvitationRepository.findByEmailAndDeletedTimeIsNull(email).ifPresent(UserInvitation::invalidate);
    }
}
