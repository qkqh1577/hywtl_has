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
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
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

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt; // 생성일시

    @CreatedBy
    @Column(updatable = false)
    private Long createdBy; // 생성자

    @LastModifiedDate
    private LocalDateTime modifiedAt; // 변경일시

    @LastModifiedBy
    private Long modifiedBy; // 변경자

    @Getter(AccessLevel.NONE)
    @Column(insertable = false)
    private LocalDateTime deletedAt; // 삭제일시

    @Getter(AccessLevel.NONE)
    @Column(insertable = false)
    private Long deletedBy; // 삭제자

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
            .findByEmailAndDeletedAtIsNull(email)
            .orElseThrow(
                () -> new NotFoundException("user-verification.password-reset", String.format("email: %s", email)));
        instance.repository = repository;
        return instance;
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

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    public static void invalidateIfExists(
        PasswordResetRepository repository,
        String email
    ) {
        repository.findByEmailAndDeletedAtIsNull(email).ifPresent(PasswordReset::invalidate);
    }

    public void invalidate() {
        this.deletedAt = LocalDateTime.now();
        this.save();
    }

    private void save() {
        repository.save(this);
    }
}
