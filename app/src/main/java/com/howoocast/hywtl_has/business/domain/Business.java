package com.howoocast.hywtl_has.business.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import java.util.Optional;
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

/**
 * 업체
 */
@Slf4j
@Getter
@Entity
@Table(name = Business.KEY)
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + Business.KEY + " set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Business extends CustomEntity {

    public static final String KEY = "business";

    /**
     * 업체명
     */
    @NotBlank
    @Column(nullable = false)
    private String name;

    /**
     * 대표명
     */
    private String ceoName;

    /**
     * 사업자 등록 번호
     */
    @NotBlank
    @Column(nullable = false)
    private String registrationNumber;

    /**
     * 주소
     */
    private String address;

    /**
     * 대표 전화번호
     */
    private String officePhone;

    /**
     * 비고
     */
    private String note;

    @OneToMany(cascade = CascadeType.ALL)
    private List<BusinessManager> managerList;

    public static Business of(
        String name,
        String ceoName,
        String registrationNumber,
        String address,
        String officePhone,
        String note,
        List<BusinessManager> managerList
    ) {
        Business instance = new Business();
        instance.change(
            name,
            ceoName,
            registrationNumber,
            address,
            officePhone,
            note,
            managerList
        );
        return instance;
    }

    public void change(
        String name,
        String ceoName,
        String registrationNumber,
        String address,
        String officePhone,
        String note,
        List<BusinessManager> managerList
    ) {
        this.name = name;
        this.ceoName = ceoName;
        this.registrationNumber = registrationNumber;
        this.address = address;
        this.officePhone = officePhone;
        this.note = note;
        this.managerList = managerList;
    }

    public Optional<BusinessManager> findById(Long id) {
        if (this.managerList == null || this.managerList.isEmpty()) {
            throw new NotFoundException(BusinessManager.KEY, id);
        }
        return this.managerList.stream().filter(manager -> manager.getId().equals(id)).findFirst();
    }
}
