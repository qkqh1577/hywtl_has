package com.howoocast.hywtl_has.project.parameter;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class ProjectBasicParameter {

    @NotBlank(message = "project-basic.name.not-blank")
    private String name;

    @NotBlank(message = "project-basic.code.not-blank")
    private String code;

    private String alias;

    @NotNull(message = "project-basic.sales-manager-id.not-null")
    private Long salesManagerId;

    @NotNull(message = "project-basic.project-manager-id.not-null")
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

    @RequiredArgsConstructor
    public static class ProjectOfBuilder {

        private final ProjectBasicParameter params;

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
                params.name,
                params.code,
                params.alias,
                this.salesManager,
                this.projectManager
            );
        }
    }

    @RequiredArgsConstructor
    public static class ProjectBasicChangeBuilder {

        private final ProjectBasicParameter params;

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
                params.name,
                params.code,
                params.alias,
                salesManager,
                projectManager,
                params.address,
                params.purpose1,
                params.purpose2,
                params.lotArea,
                params.totalArea,
                params.buildingCount,
                params.householdCount,
                params.floorCount,
                params.baseCount,
                params.clientName,
                params.isClientLH,
                params.clientManager,
                params.clientPhone,
                params.clientEmail
            );
        }
    }

}

