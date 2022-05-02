package com.howoocast.hywtl_has.project.domain;

import com.howoocast.hywtl_has.common.domain.FileItem;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectTargetDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn
    @NotNull
    private FileItem fileItem;

    private String memo;

    @ManyToOne
    @NotNull
    private User writer;

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime;

    //////////////////////////////////
    //// constructor
    //////////////////////////////////
    protected ProjectTargetDocument(
        FileItem fileItem,
        String memo,
        User writer
    ) {
        this.fileItem = fileItem;
        this.memo = memo;
        this.writer = writer;
        this.createdTime = LocalDateTime.now();
    }

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static ProjectTargetDocument of(
        FileItem fileItem,
        String memo,
        User writer
    ) {
        return new ProjectTargetDocument(
            fileItem,
            memo,
            writer
        );
    }

    //////////////////////////////////
    //// finder
    //////////////////////////////////

    //////////////////////////////////
    //// checker
    //////////////////////////////////

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
}
