package com.howoocast.hywtl_has.project.view;

import com.howoocast.hywtl_has.project.common.ProjectStatus;
import com.howoocast.hywtl_has.project.domain.ProjectBasic;
import com.howoocast.hywtl_has.user.view.UserListView;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ProjectBasicView {

    private String code;

    private String name;

    private String alias;

    private ProjectStatus status;

    private UserListView salesManager;

    private UserListView projectManager;

    private String address;

    private String purpose1;

    private String purpose2;

    private Double lotArea;

    private Double totalArea;

    private Integer buildingCount;

    private Integer householdCount;

    private Integer floorCount;

    private Integer baseCount;

    private String clientName;

    private Boolean isClientLH;

    private String clientManager;

    private String clientPhone;

    private String clientEmail;

    private LocalDateTime modifiedAt;

    public static ProjectBasicView assemble(ProjectBasic source) {
        ProjectBasicView target = new ProjectBasicView();
        target.code = source.getCode();
        target.name = source.getName();
        target.alias = source.getAlias();
        target.status = source.getStatus();
        target.salesManager = UserListView.assemble(source.getSalesManager());
        target.projectManager = UserListView.assemble(source.getProjectManager());
        target.address = source.getAddress();
        target.purpose1 = source.getPurpose1();
        target.purpose2 = source.getPurpose2();
        target.lotArea = source.getLotArea();
        target.totalArea = source.getTotalArea();
        target.buildingCount = source.getBuildingCount();
        target.householdCount = source.getHouseholdCount();
        target.floorCount = source.getFloorCount();
        target.baseCount = source.getBaseCount();
        target.clientName = source.getClientName();
        target.isClientLH = source.getIsClientLH();
        target.clientManager = source.getClientManager();
        target.clientPhone = source.getClientPhone();
        target.clientEmail = source.getClientEmail();
        target.modifiedAt = source.getModifiedAt();
        return target;
    }
}
