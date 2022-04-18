package com.howoocast.hywtl_has.personnel.domain;

import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.personnel.repository.PersonnelRepository;
import com.howoocast.hywtl_has.user.domain.User;
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

    @OneToOne
    @JoinColumn(name = "id")
    private User user;

    @NotNull
    @Embedded
    private PersonnelBasic basic;

    // 직위
    // 직종
    // 부서
    // 구분(신입, 경력)
    // 추천자
    // 학력 - 리스트
    // 경력 - 리스트
    // 면허 - 리스트
    // 어학 - 리스트

    public static Personnel of(
        PersonnelRepository repository,
        User user,
        PersonnelBasic basic
    ) {
        if (repository.findById(user.getId()).isPresent()) {
            throw new IllegalRequestException("인사카드가 존재합니다.");
        }
        Personnel instance = new Personnel();
        instance.id = user.getId();
        instance.basic = basic;
        return repository.save(instance);
    }

}
