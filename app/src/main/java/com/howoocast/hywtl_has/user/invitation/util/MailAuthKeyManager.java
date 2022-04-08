package com.howoocast.hywtl_has.user.invitation.util;

import com.howoocast.hywtl_has.user.invitation.domain.UserInvitation;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;

public final class MailAuthKeyManager {

    public static String generate(String email) {
        PasswordEncoder encoder = new SCryptPasswordEncoder();
        return encoder.encode(createRawPassword(email));
    }

    public static boolean authenticate(UserInvitation userInvitation, String authKey) {
        PasswordEncoder encoder = new SCryptPasswordEncoder();
        return encoder.matches(createRawPassword(userInvitation.getEmail(), userInvitation.getCreatedTime()), authKey);
    }

    private static String createRawPassword(String email) {
        return createRawPassword(email, LocalDateTime.now());
    }

    private static String createRawPassword(String email, LocalDateTime createdTime) {
        return createdTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss=")) + email;
    }
}
