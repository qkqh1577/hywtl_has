package com.howoocast.hywtl_has.project_estimate.domain;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectEstimateSheetComment {

    @NotNull
    @Column(nullable = false)
    private Integer seq;

    @NotBlank
    @Column(nullable = false)
    private String description;

    @NotNull
    @Column(nullable = false)
    private Boolean inUse;

    public static ProjectEstimateSheetComment of(
        Integer seq,
        String description,
        Boolean inUse
    ) {
        return new ProjectEstimateSheetComment(
            seq,
            description,
            inUse
        );
    }
}
