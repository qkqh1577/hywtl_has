package com.howoocast.hywtl_has.common.domain;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PreUpdate;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

@Getter
@MappedSuperclass
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class CustomEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @CreatedDate
    @Column(updatable = false)
    protected LocalDateTime createdAt; // 생성일시

    @CreatedBy
    @Column(updatable = false)
    protected Long createdBy; // 생성자

    protected LocalDateTime modifiedAt; // 변경일시

    @LastModifiedBy
    protected Long modifiedBy; // 변경자

    @Getter(AccessLevel.NONE)
    @Column(insertable = false)
    protected LocalDateTime deletedAt; // 삭제일시

    @Getter(AccessLevel.NONE)
    @Column(insertable = false)
    protected Long deletedBy; // 삭제자

    @PreUpdate
    public void modifiedAt() {
        this.modifiedAt = LocalDateTime.now();
    }

}
