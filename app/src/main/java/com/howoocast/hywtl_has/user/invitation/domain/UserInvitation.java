package com.howoocast.hywtl_has.user.invitation.domain;

import com.howoocast.hywtl_has.common.service.exception.NotFoundException;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user.invitation.exception.UserInvitationAuthenticationFailureException;
import com.howoocast.hywtl_has.user.invitation.repository.UserInvitationProvider;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserInvitation {

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
    @ManyToOne
    private Department department; // 소속 부서

    @NotNull
    @Column(nullable = false, updatable = false)
    private UserRole userRole;

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime;

    @Column(insertable = false)
    private LocalDateTime deletedTime;


    public static UserInvitation of(
        String email,
        String name,
        Department department,
        UserRole userRole
    ) {
        return new UserInvitation(
            email,
            name,
            department,
            userRole
        );
    }

    public static UserInvitation load(
        UserInvitationProvider provider,
        String email
    ) {
        return provider.findByEmail(email).orElseThrow(NotFoundException::new);
    }


    public void checkValid(String invalidatePeriod, String authKey) {
        LocalDateTime limitTime = this.getCreatedTime().plus(Duration.parse(invalidatePeriod));
        if (limitTime.isBefore(LocalDateTime.now())) {
            throw new UserInvitationAuthenticationFailureException();
        }
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        if (!encoder.matches(this.getRawKey(), authKey)) {
            throw new UserInvitationAuthenticationFailureException();
        }
    }

    public void invalidate() {
        this.deletedTime = LocalDateTime.now();
    }

    public String getAuthKey() {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(this.getRawKey());
    }

    private UserInvitation(
        String email,
        String name,
        Department department,
        UserRole userRole
    ) {
        this.email = email;
        this.name = name;
        this.department = department;
        this.userRole = userRole;
        this.createdTime = LocalDateTime.now();
    }


    private String getRawKey() {
        return this.createdTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss="))
            + this.email;
    }
}

