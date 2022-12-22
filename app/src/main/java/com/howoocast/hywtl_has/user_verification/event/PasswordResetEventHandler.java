package com.howoocast.hywtl_has.user_verification.event;

import com.howoocast.hywtl_has.common.service.MailService;
import com.howoocast.hywtl_has.user_verification.domain.PasswordReset;
import com.howoocast.hywtl_has.user_verification.domain.PasswordResetToken;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
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
public class PasswordResetEventHandler {

    @Value("${application.front-url}")
    private String frontUrl;

    @Value("${application.mail.invalidate-duration}")
    private String invalidateDuration;

    @Value("${application.mail.expire-time}")
    private String expirationTime;

    private final MailService mailService;

    @TransactionalEventListener(
        classes = PasswordResetRequestEvent.class,
        phase = TransactionPhase.AFTER_COMPLETION
    )
    public void sendMail(PasswordResetRequestEvent e) throws MessagingException, UnsupportedEncodingException {
        PasswordReset data = e.getData();
        PasswordResetToken token = e.getToken();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        String message = String.format(
            "본인 확인용 이메일입니다."
                + "<br>"
                + "%s님, 안녕하세요."
                + "<br>"
                + "HYWTL HAS 계정 %s의 비밀번호를 재설정하실 수 있습니다."
                + "<br>"
                + "아래의 버튼을 클릭하여 새로운 비밀번호를 설정해주세요."
                + "<br>"
                + "만약, 새로운 비밀번호 설정을 요청하지 않으셨다면 이 이메일을 무시해주세요."
                + "<br>"
                + "기존 비밀번호가 유지됩니다."
                + "<br>"
                + "[새 비밀번호 설정하기]"
                + "<br>"
                + "<a href=\"%s/user/password-reset?token=%s\">"
                + " 비밀번호 변경 페이지로 가기 </a>"
                + "<br>"
                + "<h5>해당 주소는 %s까지 유효합니다.</h5>",
            URLDecoder.decode(data.getName(), StandardCharsets.UTF_8),
            URLEncoder.encode(data.getUsername(), StandardCharsets.UTF_8),
            frontUrl,
            URLEncoder.encode(token.getToken(), StandardCharsets.UTF_8),
            token.getCreatedAt().plus(Duration.parse(expirationTime)).format(formatter)
        );
        mailService.send(
            data.getEmail(),
            data.getName(),
            "비밀번호 초기화를 위한 확인 메일입니다.",
            message
        );
    }
}
