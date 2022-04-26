package com.howoocast.hywtl_has.user.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user.exception.PasswordException;
import com.howoocast.hywtl_has.user.exception.PasswordException.PasswordExceptionType;
import com.howoocast.hywtl_has.user.exception.UserLoginException;
import com.howoocast.hywtl_has.user.exception.UserLoginException.UserLoginExceptionType;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@Entity
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
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Column(insertable = false)
    private LocalDateTime loginTime; // 최근 접속일시

    @Column(insertable = false)
    private LocalDateTime lockedTime; // 잠김 처리일시

    @Column(nullable = false)
    private LocalDateTime passwordChangedTime; // 비밀번호 변경일시

    @NotNull
    @Column(nullable = false, updatable = false)
    private final LocalDateTime createdTime; // 생성일시

    @NotNull
    @Column(nullable = false)
    private final LocalDateTime updatedTime; // 변경일시

    @Getter(AccessLevel.NONE)
    @Column(insertable = false)
    private LocalDateTime deletedTime; // 삭제일시

    @Getter(AccessLevel.NONE)
    @JsonIgnore
    @Transient
    private UserRepository repository;

    //////////////////////////////////
    //// constructor
    //////////////////////////////////
    protected User() {
        this.createdTime = LocalDateTime.now();
        this.updatedTime = this.createdTime;
    }

    protected User(
        String username,
        String password,
        String name,
        String email,
        Department department,
        UserRole userRole
    ) {
        this();
        this.username = username;
        this.name = name;
        this.email = email;
        this.department = department;
        this.userRole = userRole;
        this.setPassword(password);
    }

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////
    private void setPassword(String password) {
        this.password = new BCryptPasswordEncoder().encode(password);
        this.passwordChangedTime = LocalDateTime.now();
        this.lockedTime = null;
    }

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static User of(
        UserRepository repository,
        String username,
        String password,
        String name,
        String email,
        Department department,
        UserRole userRole
    ) {
        User instance = new User(
            username,
            password,
            name,
            email,
            department,
            userRole
        );
        instance.repository = repository;
        instance.checkEmailUsed();
        instance.checkUsernameUsed();
        instance.save();
        return instance;
    }

    //////////////////////////////////
    //// finder
    //////////////////////////////////
    public static User load(
        UserRepository repository,
        Long id
    ) {
        User instance = repository.findByIdAndDeletedTimeIsNull(id)
            .orElseThrow(NotFoundException::new);
        instance.repository = repository;
        return instance;
    }

    public static User load(
        UserRepository repository,
        String username
    ) {
        User instance = repository.findByUsernameAndDeletedTimeIsNull(username)
            .orElseThrow(NotFoundException::new);
        instance.repository = repository;
        return instance;
    }

    //////////////////////////////////
    //// checker
    //////////////////////////////////
    public static void checkEmail(
        UserRepository repository,
        String email
    ) {
        if (repository.findByEmailAndDeletedTimeIsNull(email).isPresent()) {
            throw new DuplicatedValueException("email", email);
        }
    }

    private void checkEmailUsed() {
        repository.findByEmailAndDeletedTimeIsNull(this.email).ifPresent(target -> {
            if (!Objects.equals(this.id, target.id)) {
                throw new DuplicatedValueException("email", this.email);
            }
        });
    }

    private void checkUsernameUsed() {
        repository.findByUsernameAndDeletedTimeIsNull(this.username).ifPresent(target -> {
            if (!Objects.equals(this.id, target.id)) {
                throw new DuplicatedValueException("username", this.username);
            }
        });
    }

    private void checkCanLogin(String invalidatePeriod) {
        if (Objects.nonNull(this.deletedTime)) {
            throw new NotFoundException();
        }
        if (Objects.nonNull(this.lockedTime)) {
            throw new UserLoginException(UserLoginExceptionType.LOCKED);
        }

        LocalDateTime limitTime = this.passwordChangedTime.plus(Duration.parse(invalidatePeriod));
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
        UserRole userRole,
        Department department
    ) {
        this.name = name;
        this.email = email;
        this.userRole = userRole;
        this.department = department;

        this.checkEmailUsed();
        this.save();
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
        this.save();
    }

    public void login(
        String invalidatePeriod
    ) {
        this.checkCanLogin(invalidatePeriod);
        this.loginTime = LocalDateTime.now();
        this.save();
    }

    public void delete() {
        this.deletedTime = LocalDateTime.now();
    }

    private void save() {
        repository.save(this);
    }
}
