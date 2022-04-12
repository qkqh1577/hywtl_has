package com.howoocast.hywtl_has.user.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.user.common.UserRole;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;
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
    private LocalDateTime signedInTime; // 최근 접속일

    @Column(insertable = false)
    private LocalDateTime passwordChangedTime; // 비밀번호 변경일

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime; // 생성 일자

    @Column(insertable = false)
    private LocalDateTime deletedTime; // 삭제 일자

    public static User add(
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


    public boolean canSignIn(String invalidatePeriod) {
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

    public void changeRole(
        UserRole userRole
    ) {
        this.userRole = userRole;
    }

    public void signIn() {
        this.signedInTime = LocalDateTime.now();
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
        this.password = new BCryptPasswordEncoder().encode(password);
        this.name = name;
        this.email = email;
        this.department = department;
        this.userRole = userRole;
        this.createdTime = LocalDateTime.now();
        this.passwordChangedTime = this.createdTime;
    }
}