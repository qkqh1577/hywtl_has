package com.howoocast.hywtl_has.project_estimate.domain;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import javax.persistence.Column;
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
import org.hibernate.annotations.DiscriminatorFormula;
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
@DiscriminatorFormula("case when type ='SYSTEM' then 'SYSTEM' else 'CUSTOM' end")
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
    @Column(nullable = false)
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
    private String recipient;

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

    @ManyToOne
    private Business business;

    protected ProjectEstimate(
        String code,
        ProjectEstimateType type,
        Boolean isSent,
        String recipient,
        String note,
        User writer,
        Project project,
        Business business
    ) {
        this.project = project;
        this.code = code;
        this.type = type.name();
        this.recipient = recipient;
        this.note = note;
        this.writer = writer;
        this.isSent = isSent;
        this.business = business;
        this.confirmed = false;
    }

    public void change(
        Boolean isSent,
        String recipient,
        String note,
        Business business
    ) {
        this.isSent = isSent;
        this.recipient = recipient;
        this.note = note;
        this.business = business;
    }

    public void changeConfirmed(
        Boolean confirmed
    ) {
        this.confirmed = confirmed;
    }
}
