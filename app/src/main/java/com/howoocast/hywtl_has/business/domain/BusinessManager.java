package com.howoocast.hywtl_has.business.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Slf4j
@Getter
@Entity
@Table(name = BusinessManager.KEY)
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + BusinessManager.KEY + " set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BusinessManager extends CustomEntity {

    public static final String KEY = "business_manager";

    /**
     * 담당자명
     */
    @NotBlank
    @Column(nullable = false)
    private String name;

    /**
     * 호칭
     */
    private String jobTitle;

    /**
     * 핸드폰
     */
    private String mobilePhone;

    /**
     * 전화번호
     */
    private String officePhone;

    /**
     * 이메일
     */
    private String email;

    /**
     * 메타
     */
    @ElementCollection
    private List<String> meta; //

    /**
     * 상태
     */
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BusinessManagerStatus status;

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
