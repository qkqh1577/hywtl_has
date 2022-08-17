package com.howoocast.hywtl_has.project.parameter;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class ProjectBasicParameter {

    @NotBlank(message = "project_basic.name.not_blank")
    private String name;

    @NotBlank(message = "project_basic.code.not_blank")
    private String code;

    private String alias;

    @NotNull(message = "project_basic.sales_manager_id.not_null")
    private Long salesManagerId;

    @NotNull(message = "project_basic.project_manager_id.not_null")
    private Long projectManagerId;

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

    public ProjectOfBuilder ofBuilder() {
        return new ProjectOfBuilder(this);
    }

    public ProjectBasicChangeBuilder changeBuilder() {
        return new ProjectBasicChangeBuilder(this);
    }

    @RequiredArgsConstructor(access = AccessLevel.PROTECTED)
    public static class ProjectOfBuilder {

        private final ProjectBasicParameter parameter;

        private User salesManager;

        private User projectManager;

        public ProjectOfBuilder salesManager(User salesManager) {
            this.salesManager = salesManager;
            return this;
        }

        public ProjectOfBuilder projectManager(User projectManager) {
            this.projectManager = projectManager;
            return this;
        }

        public Project build() {
            return Project.of(
                parameter.name,
                parameter.code,
                parameter.alias,
                this.salesManager,
                this.projectManager
            );
        }
    }

    @RequiredArgsConstructor(access = AccessLevel.PROTECTED)
    public static class ProjectBasicChangeBuilder {

        private final ProjectBasicParameter parameter;

        private User salesManager;

        private User projectManager;

        public ProjectBasicChangeBuilder salesManager(User salesManager) {
            this.salesManager = salesManager;
            return this;
        }

        public ProjectBasicChangeBuilder projectManager(User projectManager) {
            this.projectManager = projectManager;
            return this;
        }

        public void action(Project instance) {
            instance.changeBasic(
                parameter.name,
                parameter.code,
                parameter.alias,
                salesManager,
                projectManager,
                parameter.address,
                parameter.purpose1,
                parameter.purpose2,
                parameter.lotArea,
                parameter.totalArea,
                parameter.buildingCount,
                parameter.householdCount,
                parameter.floorCount,
                parameter.baseCount,
                parameter.clientName,
                parameter.isClientLH,
                parameter.clientManager,
                parameter.clientPhone,
                parameter.clientEmail
            );
        }
    }


}

