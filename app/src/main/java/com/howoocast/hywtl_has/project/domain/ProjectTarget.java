package com.howoocast.hywtl_has.project.domain;

import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectTarget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer landModelCount; // 대지 모형 개수

    @OneToMany(cascade = {CascadeType.ALL, CascadeType.MERGE})
    @OrderBy("createdTime desc")
    private List<ProjectTargetReview> reviewList; // 검토 목록

    @OneToMany(cascade = {CascadeType.ALL, CascadeType.MERGE})
    @OrderBy("createdTime desc")
    private List<ProjectTargetDocument> documentList; // 검토 자료

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime updatedTime;

    @Column(insertable = false)
    private LocalDateTime deletedTime;
}
