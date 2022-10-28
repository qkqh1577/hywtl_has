package com.howoocast.hywtl_has.user.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.login.exception.UserLoginException;
import com.howoocast.hywtl_has.login.exception.UserLoginException.UserLoginExceptionType;
import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user.exception.PasswordException;
import com.howoocast.hywtl_has.user.exception.PasswordException.PasswordExceptionType;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;
import org.springframework.lang.Nullable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Slf4j
@Getter
@Entity
@Table(name = User.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends CustomEntity {

    public static final String KEY = "user";

    /**
     * 사용자명
     */
    @NotBlank
    @Column(nullable = false)
    private String name;

    /**
     * 로그인 아이디
     */
    @NotBlank
    @Column(nullable = false, updatable = false)
    private String username;

    /**
     * 로그인 비밀번호
     */
    @NotBlank
    @Column(nullable = false)
    private String password;

    /**
     * 이메일
     */
    @NotBlank
    @Column(nullable = false)
    private String email;

    /**
     * 소속 조직
     */
    @ManyToOne
    private Department department;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    /**
     * 최근 접속일시
     */
    @Column(insertable = false)
    private LocalDateTime loginAt;

    /**
     * 잠김 처리일시
     */
    @Column(insertable = false)
    private LocalDateTime lockedAt;

    /**
     * 비밀번호 변경일시
     */
    @Column(nullable = false)
    private LocalDateTime passwordChangedAt;

    /**
     * 영문명
     */
    private String engName;

    /**
     * 생년월일
     */
    private LocalDate birthDate;

    /**
     * 성별
     */
    private String sex;

    /**
     * 핸드폰
     */
    private String mobilePhone;

    /**
     * 개인 이메일
     */
    private String privateEmail;

    /**
     * 비상 연락처
     */
    private String emergencyPhone;

    /**
     * 비상연락처 사원과의 관계
     */
    private String relationship;

    /**
     * 주소
     */
    private String address;

    /**
     * 프로필 사진
     */
    @ManyToOne
    private FileItem profile;

    private String status; // 사용, 사용 중지

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
        this.status = "사용";
    }

    private void setPassword(String password) {
        this.password = new BCryptPasswordEncoder().encode(password);
        this.passwordChangedAt = LocalDateTime.now();
        this.lockedAt = null;
    }

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

    public void setStatus(String status) {
        this.status = status;
    }

    public void delete() {
        this.deletedAt = LocalDateTime.now();
    }

    public void change(
        String engName,
        LocalDate birthDate,
        String sex,
        String mobilePhone,
        String privateEmail,
        String emergencyPhone,
        String relationship,
        String address,
        @Nullable FileItem profile
    ) {
        this.engName = engName;
        this.birthDate = birthDate;
        this.sex = sex;
        this.mobilePhone = mobilePhone;
        this.privateEmail = privateEmail;
        this.emergencyPhone = emergencyPhone;
        this.relationship = relationship;
        this.address = address;
        this.profile = profile;
    }

}
