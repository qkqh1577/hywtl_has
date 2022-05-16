package com.howoocast.hywtl_has.company.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Slf4j
@Getter
@Entity
@Table(name = "company")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update company set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Company extends CustomEntity {

    @NotBlank
    @Column(nullable = false)
    private String name; // 업체명

    private String representativeName; // 대표명

    @Column(nullable = false)
    private String companyNumber; // 사업자번호

    private String address; // 주소

    private String zipCode; // 우편번호

    private String phone; // 대표 전화번호

    private String memo; // 비고

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.ALL})
    private List<Manager> managerList;

    public static Company of(
        String name,
        String representativeName,
        String companyNumber,
        String address,
        String zipCode,
        String phone,
        String memo,
        List<Manager> managerList
    ) {
        Company instance = new Company();
        instance.name = name;
        instance.representativeName = representativeName;
        instance.companyNumber = companyNumber;
        instance.address = address;
        instance.zipCode = zipCode;
        instance.phone = phone;
        instance.memo = memo;
        instance.managerList = managerList;
        return instance;
    }

    public void change(
        String name,
        String representativeName,
        String companyNumber,
        String address,
        String zipCode,
        String phone,
        String memo,
        List<Manager> managerList
    ) {
        this.name = name;
        this.representativeName = representativeName;
        this.companyNumber = companyNumber;
        this.address = address;
        this.zipCode = zipCode;
        this.phone = phone;
        this.memo = memo;
        this.managerList = managerList;
    }
}
