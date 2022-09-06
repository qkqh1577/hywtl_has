package com.howoocast.hywtl_has.project_estimate.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Entity
@Table(name = ProjectEstimate.KEY)
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + ProjectEstimate.KEY + " set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")
public abstract class ProjectEstimate extends CustomEntity {

    public static final String KEY = "project_estimate";
    /**
     * 견적 번호
     */
    @NotBlank
    @Column(nullable = false)
    private String code;

    /**
     * 견적 구분
     */
    @NotBlank
    @Column(nullable = false, insertable = false, updatable = false)
    private String type;

    /**
     * 송부 여부
     */
    @NotNull
    @Column(nullable = false)
    private Boolean isSent;

    /**
     * 최종 여부
     */
    @NotNull
    @Column(nullable = false)
    private Boolean confirmed;

    /**
     * 송신처
     */
    @NotBlank
    @Column(nullable = false)
    private String business;

    /**
     * 비고
     */
    private String note;

    /**
     * 작성자
     */
    @ManyToOne
    private User writer;

    @ManyToOne
    private Project project;

    protected ProjectEstimate(
        String code,
        ProjectEstimateType type,
        Boolean isSent,
        String business,
        String note,
        User writer,
        Project project
    ) {
        this.project = project;
        this.code = code;
        this.type = type.name();
        this.business = business;
        this.note = note;
        this.writer = writer;
        this.isSent = isSent;
        this.confirmed = false;
    }

    public void change(
        String business,
        String note,
        Boolean isSent
    ) {
        this.business = business;
        this.note = note;
        this.isSent = isSent;
    }

    public void changeConfirmed(
        Boolean confirmed
    ) {
        this.confirmed = confirmed;
    }
}
