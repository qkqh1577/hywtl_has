package com.howoocast.hywtl_has.business.domain;

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
import java.util.List;

@Slf4j
@Getter
@Entity
@Table(name = "business")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update business set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Business extends CustomEntity {

    @NotBlank
    @Column(nullable = false)
    private String name; // 업체명

    private String representativeName; // 대표명

    @NotBlank
    @Column(nullable = false)
    private String registrationNumber; // 사업자번호

    private String address; // 주소

    private String zipCode; // 우편번호

    private String officePhone; // 대표 전화번호

    private String memo; // 비고

    @OneToMany(cascade = CascadeType.ALL)
    private List<BusinessManager> managerList;

    public static Business of(
        String name,
        String representativeName,
        String registrationNumber,
        String address,
        String zipCode,
        String officePhone,
        String memo,
        List<BusinessManager> managerList
    ) {
        Business instance = new Business();
        instance.name = name;
        instance.representativeName = representativeName;
        instance.registrationNumber = registrationNumber;
        instance.address = address;
        instance.zipCode = zipCode;
        instance.officePhone = officePhone;
        instance.memo = memo;
        instance.managerList = managerList;
        return instance;
    }

    public void change(
        String name,
        String representativeName,
        String registrationNumber,
        String address,
        String zipCode,
        String officePhone,
        String memo,
        List<BusinessManager> managerList
    ) {
        this.name = name;
        this.representativeName = representativeName;
        this.registrationNumber = registrationNumber;
        this.address = address;
        this.zipCode = zipCode;
        this.officePhone = officePhone;
        this.memo = memo;
        this.managerList = managerList;
    }
}
