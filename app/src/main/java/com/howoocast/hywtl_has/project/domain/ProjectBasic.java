package com.howoocast.hywtl_has.project.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;

@Entity
@Getter
public class ProjectBasic {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @OneToOne
    @JoinColumn
    @NotNull
    private Project project;

    @NotBlank
    @Column(nullable = false, updatable = false, unique = true)
    private String code; // 코드

    @NotBlank
    @Column(nullable = false)
    private String name; // 이름

    private String alias; // 별칭

    private String status; // 상태

    @ManyToOne
    @NotNull
    private User salesManager; // 영업 당담자

    @ManyToOne
    @NotNull
    private User projectManager; // 담당 PM

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime updatedTime;

    @Column(insertable = false)
    private LocalDateTime deletedTime;

    protected ProjectBasic() {
        this.createdTime = LocalDateTime.now();
        this.updatedTime = this.createdTime;
    }

    public static ProjectBasic of(
        String name,
        String alias,
        String status,
        User salesManager,
        User projectManager
    ) {
        ProjectBasic instance = new ProjectBasic();
        instance.name = name;
        instance.alias = alias;
        instance.status = status;
        instance.salesManager = salesManager;
        instance.projectManager = projectManager;
        return instance;
    }
}
