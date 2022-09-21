package com.howoocast.hywtl_has.common.domain;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;
import java.util.Optional;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PreUpdate;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Slf4j
@Getter
@DynamicUpdate
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class CustomEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @CreatedDate
    protected LocalDateTime createdAt; // 생성일시

    @CreatedBy
    protected Long createdBy; // 생성자

    protected LocalDateTime modifiedAt; // 변경일시

    @LastModifiedBy
    protected Long modifiedBy; // 변경자

    @Getter(AccessLevel.NONE)
    protected LocalDateTime deletedAt; // 삭제일시

    @Getter(AccessLevel.NONE)
    protected Long deletedBy; // 삭제자

    @PreUpdate
    public void modifiedAt() {
        this.modifiedAt = LocalDateTime.now();
        log.debug("[Custom Entity]: postUpdate requested");
        log.debug("[Custom Entity]: modified by: {}", this.modifiedBy);
        log.debug("[Custom Entity]: deleted at: {}", Optional.ofNullable(this.deletedAt).map(date ->
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").format(date)).orElse(null));
        if (Objects.nonNull(this.deletedAt)) {
            this.deletedBy = this.modifiedBy;
        }
    }

    public void delete() {
        this.deletedAt = LocalDateTime.now();
    }
}
