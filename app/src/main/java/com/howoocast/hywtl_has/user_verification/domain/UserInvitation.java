package com.howoocast.hywtl_has.user_verification.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user_verification.exception.UserVerificationAuthenticationFailureException;
import com.howoocast.hywtl_has.user_verification.exception.UserVerificationAuthenticationFailureException.UserInvitationAuthenticationFailureExceptionType;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Slf4j
@Getter
@Entity
@Table(name = UserInvitation.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserInvitation extends CustomEntity {

    public static final String KEY = "user_invitation";

    @NotBlank
    @Column(nullable = false, updatable = false)
    private String email; // 이메일

    @NotBlank
    @Column(nullable = false, updatable = false)
    private String name; // 이름

    @NotNull
    @ManyToOne
    private Department department; // 소속 조직

    @NotNull
    @Column(nullable = false, updatable = false)
    private UserRole role;

    //////////////////////////////////
    //// constructor
    //////////////////////////////////
    protected UserInvitation(
        String email,
        String name,
        Department department,
        UserRole role
    ) {
        this.email = email;
        this.name = name;
        this.department = department;
        this.role = role;
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
    public static UserInvitation of(
        String email,
        String name,
        Department department,
        UserRole role
    ) {
        return new UserInvitation(
            email,
            name,
            department,
            role
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
