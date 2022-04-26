package com.howoocast.hywtl_has.project.view;

import com.howoocast.hywtl_has.common.view.AddressView;
import com.howoocast.hywtl_has.project.domain.ProjectBuilding;
import java.util.Objects;
import lombok.Getter;
import org.springframework.lang.Nullable;

@Getter
public class ProjectBuildingView {

    private AddressView address;
    private String purpose1;

    private String purpose2;

    private Double lotArea;

    private Double totalArea;

    private Integer buildingCount;

    private Integer householdCount;

    private Integer floorCount;

    private Integer baseCount;

    public static ProjectBuildingView assemble(@Nullable ProjectBuilding source) {
        ProjectBuildingView target = new ProjectBuildingView();
        if (Objects.isNull(source)) {
            return target;
        }
        target.address = AddressView.assemble(source.getAddress());
        target.purpose1 = source.getPurpose1();
        target.purpose2 = source.getPurpose2();
        target.lotArea = source.getLotArea();
        target.totalArea = source.getTotalArea();
        target.buildingCount = source.getBuildingCount();
        target.householdCount = source.getHouseholdCount();
        target.floorCount = source.getFloorCount();
        target.baseCount = source.getBaseCount();
        return target;
    }
}
