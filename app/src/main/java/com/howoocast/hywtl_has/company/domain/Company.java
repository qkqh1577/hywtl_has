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

    @Column
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

    //////////////////////////////////
    //// constructor
    //////////////////////////////////
    protected Company(
            CompanyRepository repository,
            String name,
            String representativeName,
            String companyNumber,
            String address,
            String zipCode,
            String phone,
            String memo,
            List<Manager> managerList
    ) {
        this.repository = repository;
        this.name = name;
        this.representativeName = representativeName;
        this.companyNumber = companyNumber;
        this.address = address;
        this.zipCode = zipCode;
        this.phone = phone;
        this.memo = memo;
        this.managerList = managerList;
        this.createdAt = LocalDateTime.now();
    }

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static Company of(
            CompanyRepository repository,
            String name,
            String representativeName,
            String companyNumber,
            String address,
            String zipCode,
            String phone,
            String memo,
            List<Manager> managerList
    ) {
        Company instance = new Company(
                repository,
                name,
                representativeName,
                companyNumber,
                address,
                zipCode,
                phone,
                memo,
                managerList
        );

        instance.save();
        return instance;
    }

    public void delete() {
        this.deletedAt = LocalDateTime.now();
    }

    private void save() {
        repository.save(this);
    }
}
