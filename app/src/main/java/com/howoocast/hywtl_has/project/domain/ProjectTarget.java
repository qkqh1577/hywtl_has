package com.howoocast.hywtl_has.project.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.project_target_review.domain.ProjectTargetReview;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectTarget {

    private Integer landModelCount; // 대지 모형 개수

    @JsonManagedReference
    @OneToMany(mappedBy = "project")
    @OrderBy("createdAt desc")
    private List<ProjectTargetReview> reviewList; // 검토 목록

    @JsonManagedReference
    @OneToMany(mappedBy = "project")
    @OrderBy("createdAt desc")
    private List<ProjectTargetDocument> documentList; // 검토 자료

    @NotNull
    @Column(nullable = false)
    private LocalDateTime modifiedAt;

    public void change(
        Integer landModelCount
    ) {
        this.landModelCount = landModelCount;
        this.modifiedAt = LocalDateTime.now();
    }

    public void confirmReview(Long id) {
        if (Objects.isNull(this.reviewList) || this.reviewList.isEmpty()) {
            throw new IllegalRequestException("project.target.review.is-empty", "요청한 리뷰를 찾을 수 없습니다.");
        }
        this.reviewList.stream()
            .filter(
                item -> item.getConfirmed().equals(Boolean.TRUE)
            )
            .findFirst()
            .ifPresent(item -> {
                if (item.getId().equals(id)) {
                    throw new IllegalRequestException("project.target.review.already-confirmed", "이미 확정된 검토입니다.");
                }
                item.confirmOff();
            });
        this.reviewList.stream()
            .filter(
                item -> item.getId().equals(id)
            ).findFirst()
            .ifPresentOrElse(ProjectTargetReview::confirmOn, () -> {
                throw new NotFoundException("project.target.review", id);
            });
    }
}
