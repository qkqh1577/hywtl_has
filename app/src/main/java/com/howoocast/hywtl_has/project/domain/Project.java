package com.howoocast.hywtl_has.project.domain;

import java.time.LocalDateTime;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import lombok.Getter;

@Entity
@Getter
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "project", cascade = {CascadeType.ALL, CascadeType.MERGE})
    @NotNull
    private ProjectBasic basic;

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime updatedTime;

    @Column(insertable = false)
    private LocalDateTime deletedTime;

    protected Project() {
        this.createdTime = LocalDateTime.now();
        this.updatedTime = this.createdTime;
    }

}
