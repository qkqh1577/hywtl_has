package com.howoocast.hywtl_has.personnel.view;

import com.howoocast.hywtl_has.department.view.DepartmentView;
import com.howoocast.hywtl_has.personnel.domain.PersonnelJob;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter(AccessLevel.PROTECTED)
public class PersonnelJobView {

    private DepartmentView department;
    private String jobTitle;
    private String jobType;
    private String jobPosition;
    private String jobClass;
    private String jobDuty;
    private Boolean isRepresentative;

    public static PersonnelJobView assemble(PersonnelJob source) {
        PersonnelJobView target = new PersonnelJobView();
        target.department = DepartmentView.assemble(source.getDepartment());
        target.jobTitle = source.getJobTitle();
        target.jobType = source.getJobType();
        target.jobPosition = source.getJobPosition();
        target.jobClass = source.getJobClass();
        target.jobDuty = source.getJobDuty();
        target.isRepresentative = source.getIsRepresentative();
        return target;
    }
}
