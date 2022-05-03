package com.howoocast.hywtl_has.company.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.howoocast.hywtl_has.company.repository.CompanyRepository;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String name; // 업체명

    @Column
    private String representativeName; // 대표명

    @Column
    private String companyNumber; // 사업자번호

    @Column
    private String address; // 주소

    private String zipCode; // 우편번호

    @Column
    private String phone; // 대표 전화번호

    @Column
    private String memo; // 비고

    @OneToMany(mappedBy = "company", cascade = CascadeType.PERSIST)
    private List<Manager> managerList = new ArrayList<>();

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

    @Getter(AccessLevel.NONE)
    @JsonIgnore
    @Transient
    private CompanyRepository repository;

    public static Company of(
            String name,
            String representativeName,
            String companyNumber,
            String address,
            String zipCode,
            String phone,
            String memo,
            List<Manager> managerList,
            String createdBy
    ) {
        Company company = new Company();
        company.name = name;
        company.representativeName = representativeName;
        company.companyNumber = companyNumber;
        company.address = address;
        company.zipCode = zipCode;
        company.phone = phone;
        company.memo = memo;
        company.managerList = setManagerList(company, managerList);
        company.createdBy = createdBy;
        company.createdAt = LocalDateTime.now();
        return company;
    }

    public void edit(String name,
                     String representativeName,
                     String companyNumber,
                     String address,
                     String zipCode,
                     String phone,
                     String memo,
                     List<Manager> managerList,
                     String modifiedBy) {
        this.name = name;
        this.representativeName = representativeName;
        this.companyNumber = companyNumber;
        this.address = address;
        this.zipCode = zipCode;
        this.phone = phone;
        this.memo = memo;
        this.managerList = setManagerList(this, managerList);
        this.modifiedBy = modifiedBy;
        this.modifiedAt = LocalDateTime.now();
    }

    private static List<Manager> setManagerList(Company company, List<Manager> managerList) {
        if(managerList == null) {
            return null;
        }
        return managerList.stream()
                .peek(manager -> manager.setCompany(company))
                .collect(Collectors.toList());
    }

    public void delete(String deletedBy) {
        this.deletedBy = deletedBy;
        this.deletedAt = LocalDateTime.now();
    }
}
