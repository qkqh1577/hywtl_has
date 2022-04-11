package com.howoocast.hywtl_has.user.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.howoocast.hywtl_has.common.service.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.time.LocalDateTime;
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
    @Column(nullable = false)
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
    private LocalDateTime signedInTime;

    @Column(insertable = false)
    private LocalDateTime passwordChangedTime;

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime = LocalDateTime.now(); // 생성 일자

    @Column(insertable = false)
    private LocalDateTime deletedTime; // 삭제 일자

    public static User add(
            UserRepository provider,
            String username,
            String password,
            String name,
            String email,
            Department department,
            UserRole userRole
    ) {
        if (provider.findByUsername(username).isPresent()) {
            throw new DuplicatedValueException("username", username);
        }
        if (provider.findByEmail(email).isPresent()) {
            throw new DuplicatedValueException("email", email);
        }

        User user = new User();
        user.username = username;
        user.password = new BCryptPasswordEncoder().encode(password);
        user.name = name;
        user.email = email;
        user.department = department;
        user.userRole = userRole;

        return user;
    }

    public void change(
            String name,
            String email
    ) {
        this.name = name;
        this.email = email;
    }

}