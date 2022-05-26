package com.howoocast.hywtl_has.business.domain;

import com.howoocast.hywtl_has.business.common.BusinessManagerStatus;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Slf4j
@Getter
@Entity
@Table(name = "business_manager")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update business_manager set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BusinessManager extends CustomEntity {

    @NotBlank
    @Column(nullable=false)
    private String name; // 담당자명

    private String jobTitle; // 호칭

    private String mobilePhone; // 핸드폰

    private String officePhone; // 전화번호

    private String email; // 이메일

    @ElementCollection
    private List<String> meta; // 메타

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private BusinessManagerStatus status; // 상태

    public static BusinessManager of(
        String name,
        String jobTitle,
        String mobilePhone,
        String officePhone,
        String email,
        List<String> meta,
        BusinessManagerStatus status
    ) {
        BusinessManager manager = new BusinessManager();
        manager.name = name;
        manager.jobTitle = jobTitle;
        manager.mobilePhone = mobilePhone;
        manager.officePhone = officePhone;
        manager.email = email;
        manager.meta = meta;
        manager.status = status;
        return manager;
    }

    public void change(
            String name,
            String jobTitle,
            String mobilePhone,
            String officePhone,
            String email,
            List<String> meta,
            BusinessManagerStatus status
    ) {
        this.name = name;
        this.jobTitle = jobTitle;
        this.mobilePhone = mobilePhone;
        this.officePhone = officePhone;
        this.email = email;
        this.meta = meta;
        this.status = status;
    }
}