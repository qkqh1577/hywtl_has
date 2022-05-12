package com.howoocast.hywtl_has.project_bid.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Slf4j
@Getter
@Entity
@Table(name = "project_bid")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update project_bid set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectBid extends CustomEntity {



    private LocalDate requestedDate;

    private String figureLevel; // 모형 제작 난이도

    private String testLevel; // 실험 난이도

    private String reportLevel; // 평가 난이도
}
