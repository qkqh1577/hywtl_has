package com.howoocast.hywtl_has.user.invitation.util;

import com.howoocast.hywtl_has.user.invitation.domain.UserInvitation;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public final class MailAuthKeyManager {

    public static String generate(String email) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(createRawPassword(email));
    }

    public static boolean authenticate(UserInvitation userInvitation, String invalidatePeriod, String authKey) {
        LocalDateTime limitTime = userInvitation.getCreatedTime().plus(Duration.parse(invalidatePeriod));
        if (limitTime.isBefore(LocalDateTime.now())) {
            return false;
        }
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.matches(createRawPassword(userInvitation.getEmail(), userInvitation.getCreatedTime()), authKey);
    }

    private static String createRawPassword(String email) {
        return createRawPassword(email, LocalDateTime.now());
    }

    private static String createRawPassword(String email, LocalDateTime createdTime) {
        return createdTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss=")) + email;
    }
}
