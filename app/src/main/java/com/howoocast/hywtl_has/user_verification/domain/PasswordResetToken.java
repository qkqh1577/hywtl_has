package com.howoocast.hywtl_has.user_verification.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.time.LocalDateTime;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

@Getter
@Entity
@Table(name = PasswordResetToken.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PasswordResetToken extends CustomEntity {

    public static final String KEY = "password_reset_token";
    @NotBlank
    @Column(nullable = false, updatable = false)
    private String token;
    @NotNull
    @Column(nullable = false, updatable = false)
    private Long userId;

    private LocalDateTime expiration;

    @OneToOne(cascade = CascadeType.ALL)
    private PasswordReset passwordReset;

    protected PasswordResetToken(
        String token,
        Long userId,
        PasswordReset passwordReset,
        LocalDateTime expiration) {
        this.token = token;
        this.userId = userId;
        this.passwordReset = passwordReset;
        this.expiration = expiration;
    }

    public static PasswordResetToken of(
        String token,
        Long userId,
        PasswordReset passwordReset,
        LocalDateTime expiration) {
        return new PasswordResetToken(token, userId, passwordReset, expiration);
    }
}
