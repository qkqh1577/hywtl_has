package com.howoocast.hywtl_has.user_verification.event;

import com.howoocast.hywtl_has.common.service.MailService;
import com.howoocast.hywtl_has.user_verification.domain.UserInvitation;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.format.DateTimeFormatter;
import javax.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserInvitationEventHandler {

    @Value("${application.front-url}")
    private String frontUrl;

    @Value("${application.mail.invalidate-duration}")
    private String invalidateDuration;

    private final MailService mailService;

    @TransactionalEventListener(classes = UserInvitationAddEvent.class, phase = TransactionPhase.AFTER_COMPLETION)
    public void sendMail(UserInvitationAddEvent e) throws MessagingException, UnsupportedEncodingException {
        UserInvitation data = e.getData();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        String message = String.format(
            "본인 확인용 이메일입니다."
                + "<a href=\"%s/user/authenticate?email=%s&authKey=%s\">"
                + " 인증 페이지로 가기 </a>"
                + "<br>"
                + "<h5>해당 주소는 %s까지 유효합니다.</h5>",
            frontUrl,
            URLEncoder.encode(data.getEmail(), StandardCharsets.UTF_8),
            URLEncoder.encode(data.getAuthKey(), StandardCharsets.UTF_8),
            data.getCreatedAt().plus(Duration.parse(invalidateDuration)).format(formatter)
        );
        mailService.send(
            data.getEmail(),
            data.getName(),
            "가입 전 본인 확인 메일입니다.",
            message
        );
    }
}

