package com.howoocast.hywtl_has.project_memo.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;

@Slf4j
@Getter
@Entity
@Table(name = ProjectMemo.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectMemo extends CustomEntity {

    public static final String KEY = "project_memo";

    @NotBlank
    @Column(nullable = false)
    private String description;

    @ManyToOne
    private Project project;

    @ManyToOne
    private User writer;

    @NotNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ProjectMemoCategory category;


    public static ProjectMemo of(
        Project project,
        ProjectMemoCategory category,
        User writer,
        String description
    ) {
        ProjectMemo instance = new ProjectMemo();
        instance.project = project;
        instance.category = category;
        instance.writer = writer;
        instance.description = description;
        return instance;
    }

    public void change(
        ProjectMemoCategory category,
        String description
    ) {
        this.category = category;
        this.description = description;
    }

}
