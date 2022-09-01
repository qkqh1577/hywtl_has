package com.howoocast.hywtl_has.user_verification.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.user_verification.exception.UserVerificationAuthenticationFailureException;
import com.howoocast.hywtl_has.user_verification.exception.UserVerificationAuthenticationFailureException.UserInvitationAuthenticationFailureExceptionType;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Slf4j
@Getter
@Entity
@Table(name = PasswordReset.KEY)
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + PasswordReset.KEY + " set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PasswordReset extends CustomEntity {

    public static final String KEY = "password_reset";

    @NotBlank
    @Column(nullable = false, updatable = false)
    private String email; // 이메일

    @NotBlank
    @Column(nullable = false, updatable = false)
    private String name; // 이름

    //////////////////////////////////
    //// constructor
    //////////////////////////////////
    protected PasswordReset(
        String email,
        String name
    ) {
        this.email = email;
        this.name = name;
    }

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////
    public String getAuthKey() {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(this.getRawKey());
    }

    private String getRawKey() {
        return this.createdAt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss="))
            + this.email;
    }

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static PasswordReset of(
        String email,
        String name
    ) {
        return new PasswordReset(
            email,
            name
        );
    }

    //////////////////////////////////
    //// checker
    //////////////////////////////////
    public void checkValid(String invalidatePeriod, String authKey) {
        LocalDateTime limitTime = this.getCreatedAt().plus(Duration.parse(invalidatePeriod));
        if (limitTime.isBefore(LocalDateTime.now())) {
            throw new UserVerificationAuthenticationFailureException(
                UserInvitationAuthenticationFailureExceptionType.EXPIRED);
        }
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        if (!encoder.matches(this.getRawKey(), authKey)) {
            throw new UserVerificationAuthenticationFailureException(
                UserInvitationAuthenticationFailureExceptionType.ILLEGAL_KEY);
        }
    }
}
