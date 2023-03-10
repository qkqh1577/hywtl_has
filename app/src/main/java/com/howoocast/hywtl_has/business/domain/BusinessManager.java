package com.howoocast.hywtl_has.business.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@Table(name = BusinessManager.KEY)
@Where(clause = "deleted_at is null")
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
     * 소속
     */
    private String department;

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
     * 주소
     */
    private String address;

    /**
     * 메타
     */
    @ElementCollection
    private List<String> meta;

    /**
     * 상태
     */
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BusinessManagerStatus status;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Project> projectList;

    public static BusinessManager of(
        String name,
        String jobTitle,
        String department,
        String mobilePhone,
        String officePhone,
        String email,
        List<String> meta,
        BusinessManagerStatus status,
        String address
    ) {
        BusinessManager manager = new BusinessManager();
        manager.name = name;
        manager.jobTitle = jobTitle;
        manager.department = department;
        manager.mobilePhone = mobilePhone;
        manager.officePhone = officePhone;
        manager.email = email;
        manager.meta = meta;
        manager.status = status;
        manager.address = address;
        return manager;
    }

    /**
     * @migration
     * @param name
     * @param department
     * @param jobTitle
     * @param officePhone
     * @param mobilePhone
     * @param email
     * @param address
     * @return
     */
    public static BusinessManager of(
        String name,
        @Nullable String department,
        @Nullable String jobTitle,
        @Nullable String officePhone,
        @Nullable String mobilePhone,
        @Nullable String email,
        @Nullable String address
    ) {
        BusinessManager manager = new BusinessManager();
        manager.name = name;
        manager.department = department;
        manager.jobTitle = jobTitle;
        manager.officePhone = officePhone;
        manager.mobilePhone = mobilePhone;
        manager.email = email;
        manager.address = address;
        manager.status = BusinessManagerStatus.IN_OFFICE;
        return manager;
    }

    /**
     * @migration
     * @param name
     * @param department
     * @param jobTitle
     * @param mobilePhone
     * @param email
     * @return
     */
    public static BusinessManager of(
        String name,
        @Nullable String department,
        @Nullable String jobTitle,
        @Nullable String mobilePhone,
        @Nullable String email
    ) {
        BusinessManager manager = new BusinessManager();
        manager.name = name;
        manager.department = department;
        manager.jobTitle = jobTitle;
        manager.mobilePhone = mobilePhone;
        manager.email = email;
        manager.status = BusinessManagerStatus.IN_OFFICE;
        return manager;
    }

    public void change(
        String name,
        String jobTitle,
        String department,
        String mobilePhone,
        String officePhone,
        String email,
        List<String> meta,
        BusinessManagerStatus status,
        String address
        ) {
        this.name = name;
        this.jobTitle = jobTitle;
        this.department = department;
        this.mobilePhone = mobilePhone;
        this.officePhone = officePhone;
        this.email = email;
        this.meta = meta;
        this.status = status;
        this.address = address;
    }

    public BusinessManager change(
        String jobTitle,
        String department,
        String mobilePhone,
        String email
    ) {
        this.jobTitle = jobTitle;
        this.department = department;
        this.mobilePhone = mobilePhone;
        this.email = email;
        return this;
    }

    public void updateProjectCount(List<Project> projectList
    ) {
        this.projectList = projectList;
    }
}
