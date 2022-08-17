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

    private final UserInvitationRepository repository;

    private final UserRepository userRepository;

    private final DepartmentRepository departmentRepository;

    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    public UserInvitationView authenticate(String email, String authKey) {
        UserInvitation instance = repository.findByEmail(email)
            .orElseThrow(
                () -> new NotFoundException("user-verification.user-invitation", String.format("email: %s", email)));
        instance.checkValid(invalidateDuration, authKey);
        return UserInvitationView.assemble(instance);
    }

    @Transactional
    public UserInvitationView invite(UserInviteParameter parameter) {
        String email = parameter.getEmail();
        // 기 가입자 이메일 사용 체크
        if (userRepository.findByEmail(email).isPresent()) {
            throw new DuplicatedValueException("user", "email", email);
        }

        // 기존 코드 무효화
        repository.findByEmail(email)
            .ifPresent(instance -> repository.deleteById(instance.getId()));

        UserInvitation userInvitation = UserInvitation.of(
            email,
            parameter.getName(),
            departmentRepository.findById(parameter.getDepartmentId())
                .orElseThrow(() -> new NotFoundException("department", parameter.getDepartmentId())),
            parameter.getRole()
        );

        // 메일 발송 이벤트 등록
        eventPublisher.publishEvent(new UserInvitationAddEvent(userInvitation));
        return UserInvitationView.assemble(repository.save(userInvitation));
    }
}
