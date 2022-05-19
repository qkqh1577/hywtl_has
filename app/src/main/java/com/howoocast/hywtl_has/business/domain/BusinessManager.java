package com.howoocast.hywtl_has.business.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Slf4j
@Getter
@Entity
@Table(name = "businessManager")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update businessManager set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BusinessManager extends CustomEntity {

    @NotBlank
    @Column(nullable=false)
    private String name; // 담당자명

    private String jobTitle; // 호칭

    private String mobilePhone; // 핸드폰

    private String phone; // 전화번호

    private String email; // 이메일

    private String state; // 상태

    public static BusinessManager of(
        String name,
        String jobTitle,
        String mobilePhone,
        String officePhone,
        String email,
        String state
    ) {
        BusinessManager manager = new BusinessManager();
        manager.name = name;
        manager.jobTitle = jobTitle;
        manager.mobilePhone = mobilePhone;
        manager.phone = officePhone;
        manager.email = email;
        manager.state = state;
        return manager;
    }

    public void change(
            String name,
            String jobTitle,
            String mobilePhone,
            String phone,
            String email,
            String state
    ) {
        this.name = name;
        this.jobTitle = jobTitle;
        this.mobilePhone = mobilePhone;
        this.phone = phone;
        this.email = email;
        this.state = state;
    }
}
