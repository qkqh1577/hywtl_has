package com.howoocast.hywtl_has.user_verification.domain;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.user_verification.exception.UserVerificationAuthenticationFailureException;
import com.howoocast.hywtl_has.user_verification.exception.UserVerificationAuthenticationFailureException.UserInvitationAuthenticationFailureExceptionType;
import com.howoocast.hywtl_has.user_verification.repository.PasswordResetRepository;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PasswordReset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, updatable = false)
    private String email; // 이메일

    @NotBlank
    @Column(nullable = false, updatable = false)
    private String name; // 이름

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime;

    @Column(insertable = false)
    private LocalDateTime deletedTime;

    @Getter(AccessLevel.NONE)
    @Transient
    private PasswordResetRepository repository;

    //////////////////////////////////
    //// constructor
    //////////////////////////////////
    protected PasswordReset(
        String email,
        String name
    ) {
        this.email = email;
        this.name = name;
        this.createdTime = LocalDateTime.now();
    }

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////
    public String getAuthKey() {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(this.getRawKey());
    }

    private String getRawKey() {
        return this.createdTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss="))
            + this.email;
    }

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static PasswordReset of(
        PasswordResetRepository repository,
        String email,
        String name
    ) {
        PasswordReset instance = new PasswordReset(
            email,
            name
        );
        instance.repository = repository;
        instance.save();
        return instance;
    }

    //////////////////////////////////
    //// finder
    //////////////////////////////////
    public static PasswordReset load(
        PasswordResetRepository repository,
        String email
    ) {
        PasswordReset instance = repository
            .findByEmailAndDeletedTimeIsNull(email)
            .orElseThrow(NotFoundException::new);
        instance.repository = repository;
        return instance;
    }

    //////////////////////////////////
    //// checker
    //////////////////////////////////
    public void checkValid(String invalidatePeriod, String authKey) {
        LocalDateTime limitTime = this.getCreatedTime().plus(Duration.parse(invalidatePeriod));
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

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    public static void invalidateIfExists(
        PasswordResetRepository repository,
        String email
    ) {
        repository.findByEmailAndDeletedTimeIsNull(email).ifPresent(PasswordReset::invalidate);
    }

    public void invalidate() {
        this.deletedTime = LocalDateTime.now();
        this.save();
    }

    private void save() {
        repository.save(this);
    }
}
