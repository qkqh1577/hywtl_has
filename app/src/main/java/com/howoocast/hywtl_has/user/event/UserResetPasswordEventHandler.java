package com.howoocast.hywtl_has.user.event;

import com.howoocast.hywtl_has.common.service.MailService;
import com.howoocast.hywtl_has.user.domain.User;
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
public class UserResetPasswordEventHandler {

    @Value("${application.front-url}")
    private String frontUrl;

    @Value("${application.mail.invalidate-duration}")
    private String invalidateDuration;

    private final MailService mailService;

    @TransactionalEventListener(classes = UserResetPasswordEvent.class, phase = TransactionPhase.AFTER_COMPLETION)
    public void sendMail(UserResetPasswordEvent e) throws MessagingException, UnsupportedEncodingException {
        User data = e.getData();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        String message = String.format(
            "본인 확인용 이메일입니다."
                + "<a href=\"%s/user/password?email=%s&authKey=%s\">"
                + " 인증 페이지로 가기 </a>"
                + "<br>"
                + "<h5>해당 주소는 %s까지 유효합니다.</h5>",
            frontUrl,
            URLEncoder.encode(data.getEmail(), StandardCharsets.UTF_8),
            // TODO: user invitation 을 user mail auth 로 변경
            URLEncoder.encode(data.getPassword(), StandardCharsets.UTF_8),
            data.getCreatedTime().plus(Duration.parse(invalidateDuration)).format(formatter)
        );
        mailService.send(
            data.getEmail(),
            data.getName(),
            "비밀번호 변경 본인 확인 메일입니다.",
            message
        );
    }
}
