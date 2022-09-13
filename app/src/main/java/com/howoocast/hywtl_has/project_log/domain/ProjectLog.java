package com.howoocast.hywtl_has.project_log.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Slf4j
@Getter
@Entity
@Table(name = ProjectLog.KEY)
@DynamicUpdate
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + ProjectLog.KEY + " set deleted_at = now() where id=?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectLog extends CustomEntity {
    public static final String KEY = "project_log";

    private LocalDateTime date;

    private String tabName;

    private String sectionName;

    private String itemName;

    private String before;

    private String after;

    private String username;

    private String name;

}
