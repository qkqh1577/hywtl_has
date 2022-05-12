package com.howoocast.hywtl_has.user_verification.view;

import com.howoocast.hywtl_has.user_verification.domain.PasswordReset;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class PasswordResetView {

    private String email;

    private LocalDateTime createdAt;

    public static PasswordResetView assemble(PasswordReset source) {
        PasswordResetView target = new PasswordResetView();
        target.email = source.getEmail();
        target.createdAt = source.getCreatedAt();
        return target;
    }
}
