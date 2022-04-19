package com.howoocast.hywtl_has.personnel.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.howoocast.hywtl_has.personnel.repository.PersonnelRepository;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Personnel {

    @Id
    private Long id; // share user id

    @SuppressWarnings("unused")
    @Getter(AccessLevel.NONE)
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "id")
    private User user;

    @NotNull
    @Embedded
    private PersonnelBasic basic;

    @NotNull
    @Embedded
    private PersonnelCompany company;

    // 학력 - 리스트
    // 경력 - 리스트
    // 면허 - 리스트
    // 어학 - 리스트

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime;

    @Column(insertable = false)
    private LocalDateTime deletedTime;

    public static Personnel of(
        PersonnelRepository repository,
        Long id,
        PersonnelBasic basic,
        PersonnelCompany company
    ) {
        Personnel instance = repository.findById(id).orElse(new Personnel(id));
        instance.basic = basic;
        instance.company = company;
        instance.createdTime = LocalDateTime.now();
        return repository.save(instance);
    }

    private Personnel(Long id) {
        this.id = id;
    }
}
