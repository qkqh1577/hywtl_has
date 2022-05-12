package com.howoocast.hywtl_has.company.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Slf4j
@Getter
@Entity
@Table(name = "manager")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update manager set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Manager extends CustomEntity {

    private String name; // 담당자명

    private String position; // 호칭

    private String mobile; // 핸드폰

    private String phone; // 전화번호

    private String email; // 이메일

    private String state; // 상태

    public static Manager of(
        String name,
        String position,
        String mobile,
        String phone,
        String email,
        String state
    ) {
        Manager manager = new Manager();
        manager.name = name;
        manager.position = position;
        manager.mobile = mobile;
        manager.phone = phone;
        manager.email = email;
        manager.state = state;
        return manager;
    }

    public void change(
            String name,
            String position,
            String mobile,
            String phone,
            String email,
            String state
    ) {
        this.name = name;
        this.position = position;
        this.mobile = mobile;
        this.phone = phone;
        this.email = email;
        this.state = state;
    }
}
