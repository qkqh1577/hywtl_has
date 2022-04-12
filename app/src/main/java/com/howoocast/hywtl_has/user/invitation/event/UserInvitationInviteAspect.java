package com.howoocast.hywtl_has.user.invitation.event;

import com.howoocast.hywtl_has.common.service.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.user.invitation.domain.UserInvitation;
import com.howoocast.hywtl_has.user.invitation.repository.UserInvitationRepository;
import com.howoocast.hywtl_has.user.invitation.service.parameter.UserInviteParameter;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class UserInvitationInviteAspect {

    private final UserRepository userRepository;
    private final UserInvitationRepository userInvitationRepository;

    @Before(value = "execution(public com.howoocast.hywtl_has.user.invitation.service.view.UserInvitationView com.howoocast.hywtl_has.user.invitation.service.UserInvitationService.invite(com.howoocast.hywtl_has.user.invitation.service.parameter.UserInviteParameter)) && args(params)", argNames = "params")
    public void checkUnique(UserInviteParameter params) {
        String email = params.getEmail();
        if (userRepository.findByEmailAndDeletedTimeIsNull(email).isPresent()) {
            throw new DuplicatedValueException("email", email);
        }
        userInvitationRepository.findByEmailAndDeletedTimeIsNull(email).ifPresent(UserInvitation::invalidate);
    }
}
