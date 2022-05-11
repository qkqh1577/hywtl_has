package com.howoocast.hywtl_has.project.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.common.domain.FileItem;
import com.howoocast.hywtl_has.user.domain.User;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
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
@Table(name = "project_target_document")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update project_target_document set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectTargetDocument extends CustomEntity {

    @JsonBackReference
    @Getter(AccessLevel.NONE)
    @NotNull
    @ManyToOne
    private Project project;

    @NotNull
    @OneToOne
    @JoinColumn
    private FileItem fileItem;

    @NotNull
    @ManyToOne
    private User writer;
    private String memo;

    //////////////////////////////////
    //// constructor
    //////////////////////////////////

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////
    public Long getProjectId() {
        return project.getId();
    }

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static ProjectTargetDocument of(
        Project project,
        FileItem fileItem,
        User writer,
        String memo
    ) {
        ProjectTargetDocument instance = new ProjectTargetDocument();
        instance.project = project;
        instance.fileItem = fileItem;
        instance.writer = writer;
        instance.memo = memo;
        return instance;
    }

    //////////////////////////////////
    //// checker
    //////////////////////////////////

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    public void change(
        String memo
    ) {
        this.memo = memo;
    }

}
