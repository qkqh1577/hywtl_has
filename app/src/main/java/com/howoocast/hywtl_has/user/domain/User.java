package com.howoocast.hywtl_has.user.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.personnel.domain.Personnel;
import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user.exception.PasswordException;
import com.howoocast.hywtl_has.user.exception.PasswordException.PasswordExceptionType;
import com.howoocast.hywtl_has.user.exception.UserLoginException;
import com.howoocast.hywtl_has.user.exception.UserLoginException.UserLoginExceptionType;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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
@Table(name = "user")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update user set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends CustomEntity {

    @NotBlank
    @Column(nullable = false)
    private String name; // 사용자명

    @NotBlank
    @Column(nullable = false, updatable = false)
    private String username; // 로그인 아이디

    @NotBlank
    @Column(nullable = false)
    private String password; // 로그인 비밀번호

    @NotBlank
    @Column(nullable = false)
    private String email; // 이메일

    @NotNull
    @ManyToOne
    private Department department; // 소속 조직

    @NotNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(insertable = false)
    private LocalDateTime loginAt; // 최근 접속일시

    @Column(insertable = false)
    private LocalDateTime lockedAt; // 잠김 처리일시

    @Column(nullable = false)
    private LocalDateTime passwordChangedAt; // 비밀번호 변경일시

    @JsonManagedReference
    @Getter(AccessLevel.NONE)
    @OneToOne(mappedBy = "user")
    private Personnel personnel;

    //////////////////////////////////
    //// constructor
    //////////////////////////////////
    protected User(
        String username,
        String password,
        String name,
        String email,
        Department department,
        UserRole role
    ) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.department = department;
        this.role = role;
        this.setPassword(password);
    }

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////
    private void setPassword(String password) {
        this.password = new BCryptPasswordEncoder().encode(password);
        this.passwordChangedAt = LocalDateTime.now();
        this.lockedAt = null;
    }

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static User of(
        String username,
        String password,
        String name,
        String email,
        Department department,
        UserRole role
    ) {
        return new User(
            username,
            password,
            name,
            email,
            department,
            role
        );
    }

    private void checkCanLogin(String invalidatePeriod) {
        if (Objects.nonNull(this.lockedAt)) {
            throw new UserLoginException(UserLoginExceptionType.LOCKED);
        }

        LocalDateTime limitTime = this.passwordChangedAt.plus(Duration.parse(invalidatePeriod));
        if (limitTime.isBefore(LocalDateTime.now())) {
            throw new PasswordException(PasswordExceptionType.EXPIRED);
        }
    }

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    public void change(
        String name,
        String email,
        UserRole role,
        Department department
    ) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.department = department;
    }

    public void changePassword(
        String nowPassword,
        String newPassword
    ) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (!passwordEncoder.matches(nowPassword, this.password)) {
            throw new PasswordException(PasswordExceptionType.NOT_MATCH);
        }
        if (passwordEncoder.matches(newPassword, this.password)) {
            throw new PasswordException(PasswordExceptionType.SAME);
        }
        this.setPassword(newPassword);
    }

    public void login(
        String invalidatePeriod
    ) {
        this.checkCanLogin(invalidatePeriod);
        this.loginAt = LocalDateTime.now();
    }

    public void lock() {
        this.lockedAt = LocalDateTime.now();
    }

    public void validatePassword(String password) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (passwordEncoder.matches(password, this.password)) {
            throw new PasswordException(PasswordExceptionType.SAME);
        }
        this.setPassword(password);
    }

    public void delete() {
        this.deletedAt = LocalDateTime.now();
    }

}
