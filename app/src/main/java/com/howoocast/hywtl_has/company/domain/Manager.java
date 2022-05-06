package com.howoocast.hywtl_has.company.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Manager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Company company; // 업체

    @Column
    private String name; // 담당자명

    @Column
    private String position; // 호칭

    @Column
    private String mobile; // 핸드폰

    @Column
    private String phone; // 전화번호

    @Column
    private String email; // 이메일

    @Column
    private String state; // 상태

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column
    private String createdBy;

    @Column
    private LocalDateTime modifiedAt;

    @Column(insertable = false)
    private String modifiedBy;

    @Column(insertable = false)
    private LocalDateTime deletedAt;

    @Column
    private String deletedBy;

    public static Manager of(
        String name,
        String position,
        String mobile,
        String phone,
        String email,
        String state,
        String createdBy
    ) {
        Manager manager = new Manager();
        manager.name = name;
        manager.position = position;
        manager.mobile = mobile;
        manager.phone = phone;
        manager.email = email;
        manager.state = state;
        manager.createdBy = createdBy;
        manager.createdAt = LocalDateTime.now();
        return manager;
    }


    public static Manager of(
            Long id,
            String name,
            String position,
            String mobile,
            String phone,
            String email,
            String state,
            String createdBy
    ) {
        Manager manager = new Manager();
        manager.id = id;
        manager.name = name;
        manager.position = position;
        manager.mobile = mobile;
        manager.phone = phone;
        manager.email = email;
        manager.state = state;
        manager.createdBy = createdBy;
        manager.createdAt = LocalDateTime.now();
        return manager;
    }

    public void change(
            String name,
            String position,
            String mobile,
            String phone,
            String email,
            String state,
            String modifiedBy
    ) {
        this.name = name;
        this.position = position;
        this.mobile = mobile;
        this.phone = phone;
        this.email = email;
        this.state = state;
        this.modifiedBy = modifiedBy;
        this.modifiedAt = LocalDateTime.now();
    }

    public void setCompany(Company company){
        this.company = company;
    }


    public void delete(String deletedBy) {
        this.deletedAt = LocalDateTime.now();
        this.deletedBy = deletedBy;
    }
}
