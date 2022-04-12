package com.howoocast.hywtl_has.user.event;

import com.howoocast.hywtl_has.common.service.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.user.invitation.repository.UserInvitationRepository;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.howoocast.hywtl_has.user.service.parameter.UserAddParameter;
import com.howoocast.hywtl_has.user.service.view.UserDetailView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class UserAddAspect {

    private final UserRepository userRepository;

    private final UserInvitationRepository userInvitationRepository;

    @Before(value = "execution(public com.howoocast.hywtl_has.user.service.view.UserDetailView com.howoocast.hywtl_has.user.service.UserService.add(com.howoocast.hywtl_has.user.service.parameter.UserAddParameter)) && args(params)", argNames = "params")
    public void checkUnique(UserAddParameter params) {
        String username = params.getUsername();
        String email = params.getEmail();
        if (userRepository.findByUsernameAndDeletedTimeIsNull(username).isPresent()) {
            throw new DuplicatedValueException("username", username);
        }
        if (userRepository.findByEmailAndDeletedTimeIsNull(email).isPresent()) {
            throw new DuplicatedValueException("email", email);
        }
    }

    @AfterReturning(value = "execution(public com.howoocast.hywtl_has.user.service.view.UserDetailView com.howoocast.hywtl_has.user.service.UserService.add(com.howoocast.hywtl_has.user.service.parameter.UserAddParameter))", returning = "user")
    public void deleteUserInvitationIfExists(UserDetailView user) {
        userInvitationRepository.findByEmailAndDeletedTimeIsNull(user.getEmail())
            .ifPresent(userInvitation -> {
                userInvitation.invalidate();
                userInvitationRepository.save(userInvitation);
            });
    }
}
