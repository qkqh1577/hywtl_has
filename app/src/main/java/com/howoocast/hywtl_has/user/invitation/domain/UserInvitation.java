package com.howoocast.hywtl_has.user.invitation.domain;

import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.user.common.UserRole;
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

    public void invalidate() {
        this.deletedTime = LocalDateTime.now();
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
}

