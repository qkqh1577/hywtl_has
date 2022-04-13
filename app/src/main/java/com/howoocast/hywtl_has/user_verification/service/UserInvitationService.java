package com.howoocast.hywtl_has.user_verification.service;

import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.user_verification.domain.UserInvitation;
import com.howoocast.hywtl_has.user_verification.event.UserInvitationAddEvent;
import com.howoocast.hywtl_has.user_verification.repository.UserInvitationRepository;
import com.howoocast.hywtl_has.user_verification.view.UserInvitationView;
import com.howoocast.hywtl_has.user_verification.parameter.UserInviteParameter;
import com.howoocast.hywtl_has.user.repository.UserRepository;
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

    private final UserInvitationRepository userInvitationRepository;

    private final UserRepository userRepository;

    private final DepartmentRepository departmentRepository;

    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public UserInvitationView invite(UserInviteParameter params) {
        String email = params.getEmail();

        // 기 가입자 이메일 사용 체크
        if (userRepository.findByEmailAndDeletedTimeIsNull(email).isPresent()) {
            throw new DuplicatedValueException("email", email);
        }

        // 기존 초대 코드 무효화
        userInvitationRepository.findByEmailAndDeletedTimeIsNull(email).ifPresent(UserInvitation::invalidate);

        UserInvitation userInvitation = UserInvitation.of(
            email,
            params.getName(),
            departmentRepository.findById(params.getDepartmentId()).orElseThrow(NotFoundException::new),
            params.getUserRole()
        );

        userInvitationRepository.save(userInvitation);
        // 메일 발송 이벤트 등록
        eventPublisher.publishEvent(new UserInvitationAddEvent(userInvitation));
        return UserInvitationView.assemble(userInvitation);
    }

    @Transactional
    public UserInvitationView authenticate(String email, String authKey) {
        UserInvitation userInvitation = UserInvitation.load(
            userInvitationRepository::findByEmailAndDeletedTimeIsNull,
            email
        );
        userInvitation.checkValid(invalidateDuration, authKey);
        return UserInvitationView.assemble(userInvitation);
    }
}
