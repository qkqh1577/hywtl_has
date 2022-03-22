package com.howoocast.hywtl_has.user.domain;

import com.howoocast.hywtl_has.common.domain.AbstractEntity;
import com.howoocast.hywtl_has.department.domain.Department;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import lombok.Getter;

@Getter
@Entity
public class User extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(nullable = false)
    private String username; // 로그인 아이디

    private String password; // 로그인 비밀번호

    private String email; // 이메일

    @ManyToOne
    private Department department; // 소속 부서

    @NotNull
    @Column(nullable = false)
    private UserRole userRole;

    private LocalDateTime signedInTime;

    private LocalDateTime passwordChangedTime;


}
