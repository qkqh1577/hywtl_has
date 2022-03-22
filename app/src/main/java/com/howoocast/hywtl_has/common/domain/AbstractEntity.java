package com.howoocast.hywtl_has.common.domain;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class AbstractEntity {

    @NotBlank
    @Column(nullable = false)
    protected String name; // 부서 이름, 부서명

    @Column(nullable = false)
    protected Integer seq; // 노출 순서, 동일 뎁스에서만 유효

    protected String memo; // 설명

    protected EntityStatus status; // 상태

    @NotNull
    @Column(nullable = false, updatable = false)
    protected LocalDateTime createdTime; // 생성 일자

    @Column(insertable = false)
    protected LocalDateTime removedTime; // 삭제 일자

    public AbstractEntity() {
        this.createdTime = LocalDateTime.now();
    }

}
