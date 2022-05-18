package com.howoocast.hywtl_has.project_target.view;

import com.howoocast.hywtl_has.project_target.domain.ProjectTargetReviewDetail;
import java.util.List;
import lombok.Getter;

@Getter
public class ProjectTargetReviewDetailView {

    private Long id;

    private String buildingName;

    private Integer floorCount;

    private Integer baseCount;

    private Double height;

    private Double area;

    private Double ratio;

    private List<String> specialWindLoadConditionList;

    private List<String> testList;

    private String memo1;

    private String memo2;

    public static ProjectTargetReviewDetailView assemble(ProjectTargetReviewDetail source) {
        ProjectTargetReviewDetailView target = new ProjectTargetReviewDetailView();
        target.id = source.getId();
        target.buildingName = source.getBuildingName();
        target.floorCount = source.getFloorCount();
        target.baseCount = source.getBaseCount();
        target.height = source.getHeight();
        target.area = source.getArea();
        target.ratio = source.getRatio();
        target.specialWindLoadConditionList = source.getSpecialWindLoadConditionList();
        target.testList = source.getTestList();
        target.memo1 = source.getMemo1();
        target.memo2 = source.getMemo2();
        return target;
    }
}
