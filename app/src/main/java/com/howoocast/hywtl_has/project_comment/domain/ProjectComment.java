package com.howoocast.hywtl_has.project_comment.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
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
@Table(name = ProjectComment.KEY)
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + ProjectComment.KEY + " set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectComment extends CustomEntity {

    public static final String KEY = "project_comment";
    @ManyToOne
    private Project project;

    @ManyToOne
    private User writer;

    @NotBlank
    @Column(nullable = false)
    private String description;

    protected ProjectComment(
        Project project,
        User writer,
        String description
    ) {
        this.project = project;
        this.writer = writer;
        this.description = description;
    }

    public static ProjectComment of(
        Project project,
        User writer,
        String description
    ) {
        return new ProjectComment(
            project,
            writer,
            description
        );
    }

    public void changeDescription(String description) {
        this.description = description;
    }
}
