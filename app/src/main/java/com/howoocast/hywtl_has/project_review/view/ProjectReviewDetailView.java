package com.howoocast.hywtl_has.project_review.view;

import com.howoocast.hywtl_has.project_review.domain.ProjectReviewDetail;
import java.util.List;
import lombok.Getter;

@Getter
public class ProjectReviewDetailView {

    private Long id;

    private String buildingName;

    private Integer floorCount;

    private Integer baseCount;

    private Double height;

    private Double area;

    private Double ratio;

    private List<String> specialWindLoadConditionList;

    private List<String> testList;

    private String note1;

    private String note2;

    public static ProjectReviewDetailView assemble(ProjectReviewDetail source) {
        ProjectReviewDetailView target = new ProjectReviewDetailView();
        target.id = source.getId();
        target.buildingName = source.getBuildingName();
        target.floorCount = source.getFloorCount();
        target.baseCount = source.getBaseCount();
        target.height = source.getHeight();
        target.area = source.getArea();
        target.ratio = source.getRatio();
        target.specialWindLoadConditionList = source.getSpecialWindLoadConditionList();
        target.testList = source.getTestList();
        target.note1 = source.getNote1();
        target.note2 = source.getNote2();
        return target;
    }
}
