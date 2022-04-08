package com.howoocast.hywtl_has.user.invitation.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.user.invitation.domain.UserInvitation;
import com.howoocast.hywtl_has.user.invitation.repository.UserInvitationRepository;
import com.howoocast.hywtl_has.user.invitation.service.view.UserInvitationView;
import com.howoocast.hywtl_has.user.invitation.util.MailAuthKeyManager;
import com.howoocast.hywtl_has.user.invitation.service.parameter.UserInviteParameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserInvitationService {

    private final UserInvitationRepository userInvitationRepository;

    private final DepartmentRepository departmentRepository;

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
        return UserInvitationView.assemble(userInvitation);
    }

    @Transactional
    public void authenticate(String email, String authKey) {
        UserInvitation userInvitation = userInvitationRepository.findByEmailAndDeletedTimeIsNull(email)
            .orElseThrow(NotFoundException::new);
        if (!MailAuthKeyManager.authenticate(userInvitation, authKey)) {
            // TODO: 이메일 인증 실패 exception
            throw new NullPointerException();
        }
        // TODO: 이메일 인증 성공
        invalidateIfExists(email);
    }

    private void invalidateIfExists(String email) {
        userInvitationRepository.findByEmailAndDeletedTimeIsNull(email).ifPresent(UserInvitation::invalidate);
    }
}
