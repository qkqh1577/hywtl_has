package com.howoocast.hywtl_has.project_document.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.file.domain.FileItem;
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
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@Table(name = ProjectDocument.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectDocument extends CustomEntity {

    public static final String KEY = "project_document";

    @ManyToOne
    @NotNull
    private Project project;

    /**
     * 자료 ID
     */
    @NotBlank
    @Column(nullable = false)
    private String code;

    /**
     * 자료 종류
     */
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectDocumentType type;

    /**
     * 수신처
     */
    @NotBlank
    @Column(nullable = false)
    private String recipient;

    /**
     * 파일
     */
    @ManyToOne
    @NotNull
    private FileItem file;

    /**
     * 메일 내용 파일
     */
    @ManyToOne
    private FileItem mailFile;

    /**
     * 작성자
     */
    @ManyToOne
    @NotNull
    private User writer;

    /**
     * 비고
     */
    private String note;

    public static ProjectDocument of(
        Project project,
        ProjectDocumentType type,
        String code,
        String recipient,
        FileItem file,
        @Nullable FileItem mailFile,
        @Nullable String note,
        User writer
    ) {
        ProjectDocument instance = new ProjectDocument();
        instance.project = project;
        instance.type = type;
        instance.code = code;
        instance.recipient = recipient;
        instance.file = file;
        instance.mailFile = mailFile;
        instance.note = note;
        instance.writer = writer;
        return instance;
    }

    public void change(
        String recipient,
        @Nullable FileItem mailFile,
        String note
    ) {
        this.recipient = recipient;
        this.mailFile = mailFile;
        this.note = note;
    }

}
