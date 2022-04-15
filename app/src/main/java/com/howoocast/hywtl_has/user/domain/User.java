package com.howoocast.hywtl_has.user.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.personnel.domain.Personnel;
import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user.exception.UserPasswordNotMatchException;
import com.howoocast.hywtl_has.user.exception.UserPasswordSameException;
import com.howoocast.hywtl_has.user.repository.UserProvider;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
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
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String name; // 사용자명

    @NotBlank
    @Column(nullable = false, updatable = false)
    private String username; // 로그인 아이디

    @NotBlank
    @Column(nullable = false)
    @JsonIgnore
    private String password; // 로그인 비밀번호

    @NotBlank
    @Column(nullable = false)
    private String email; // 이메일

    @NotNull
    @ManyToOne
    private Department department; // 소속 부서

    @NotNull
    @Column(nullable = false)
    private UserRole userRole;

    @Column(insertable = false)
    private LocalDateTime loginTime; // 최근 접속일시

    @Column(insertable = false)
    private LocalDateTime lockedTime; // 잠김 처리일시

    @Column(nullable = false)
    private LocalDateTime passwordChangedTime; // 비밀번호 변경일시

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime; // 생성일시

    @Column(insertable = false)
    private LocalDateTime deletedTime; // 삭제일시

    @OneToOne(mappedBy = "user")
    private Personnel personnel;

    public static User of(
        String username,
        String password,
        String name,
        String email,
        Department department,
        UserRole userRole
    ) {
        return new User(
            username,
            password,
            name,
            email,
            department,
            userRole
        );
    }

    public void checkEmailUsed(UserProvider provider) {
        provider.findBy(this.email).ifPresent(target -> {
            if (!Objects.equals(this.id, target.id)) {
                throw new DuplicatedValueException("email", this.email);
            }
        });
    }

    public void checkUsernameUsed(UserProvider provider) {
        provider.findBy(this.username).ifPresent(target -> {
            if (!Objects.equals(this.id, target.id)) {
                throw new DuplicatedValueException("username", this.username);
            }
        });
    }

    public boolean canLogin(String invalidatePeriod) {
        boolean isDeleted = Objects.nonNull(this.deletedTime);

        LocalDateTime limitTime = this.passwordChangedTime.plus(Duration.parse(invalidatePeriod));
        boolean isPasswordInvalidated = limitTime.isBefore(LocalDateTime.now());

        return !(isDeleted || isPasswordInvalidated);
    }

    public void change(
        String name,
        String email,
        UserRole userRole,
        Department department
    ) {
        this.name = name;
        this.email = email;
        this.userRole = userRole;
        this.department = department;
    }

    public void changePassword(
        String nowPassword,
        String newPassword
    ) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (!passwordEncoder.matches(nowPassword, this.password)) {
            throw new UserPasswordNotMatchException();
        }
        if (passwordEncoder.matches(newPassword, this.password)) {
            throw new UserPasswordSameException();
        }
        this.setPassword(newPassword);
    }

    public void login() {
        this.loginTime = LocalDateTime.now();
    }

    public void lock() {
        if (Objects.isNull(this.lockedTime)) {
            this.lockedTime = LocalDateTime.now();
        }
    }

    public void delete() {
        this.deletedTime = LocalDateTime.now();
    }

    protected User(
        String username,
        String password,
        String name,
        String email,
        Department department,
        UserRole userRole
    ) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.department = department;
        this.userRole = userRole;
        this.createdTime = LocalDateTime.now();
        this.setPassword(password);
    }

    private void setPassword(String password) {
        this.password = new BCryptPasswordEncoder().encode(password);
        this.passwordChangedTime = LocalDateTime.now();
        this.lockedTime = null;
    }
}