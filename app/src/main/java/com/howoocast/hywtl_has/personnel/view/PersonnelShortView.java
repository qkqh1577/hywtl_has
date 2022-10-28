package com.howoocast.hywtl_has.personnel.view;

import com.howoocast.hywtl_has.department.view.DepartmentShortView;
import com.howoocast.hywtl_has.personnel.domain.Personnel;
import com.howoocast.hywtl_has.personnel.domain.PersonnelJob;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.Getter;
import org.springframework.lang.Nullable;

@Getter
public class PersonnelShortView {

    private Long id;
    private Long userId;
    private String email;
    private String userStatus;
    private String name;
    private PersonnelBasicView basic;
    private PersonnelCompanyView company;
    private Integer academicCount;
    private Integer careerCount;
    private Integer licenceCount;
    private Integer languageCount;

    private DepartmentShortView department;


    public static PersonnelShortView assemble(Personnel source) {
        PersonnelShortView target = new PersonnelShortView();
        target.id = source.getId();
        target.name = source.getUser().getName();
        target.userId = source.getUser().getId();
        target.email = source.getUser().getEmail();
        target.userStatus = source.getUser().getStatus();
        target.company = PersonnelCompanyView.assemble(source.getCompany());
        target.academicCount = getSize(source.getAcademicList());
        target.careerCount = getSize(source.getCareerList());
        target.licenceCount = getSize(source.getLicenceList());
        target.languageCount = getSize(source.getLanguageList());
        if (Objects.isNull(source.getBasic())) {
            target.basic = new PersonnelBasicView();
            target.basic.setEngName(source.getUser().getEngName());
            target.basic.setBirthDate(source.getUser().getBirthDate());
            target.basic.setSex(source.getUser().getSex());
            target.basic.setAddress(source.getUser().getAddress());
            target.basic.setPhone(source.getUser().getMobilePhone());
            target.basic.setEmergencyPhone(source.getUser().getEmergencyPhone());
            target.basic.setRelationship(source.getUser().getRelationship());
            target.basic.setPersonalEmail(source.getUser().getPrivateEmail());
        } else {
            target.basic = PersonnelBasicView.assemble(source.getBasic());
        }
        if (Objects.isNull(source.getJobList()) || source.getJobList().isEmpty()) {
            target.department = DepartmentShortView.assemble(source.getUser().getDepartment());
        } else {
            target.department = DepartmentShortView.assemble(
                source.getJobList().stream()
                    .filter(PersonnelJob::getIsRepresentative)
                    .map(PersonnelJob::getDepartment)
                    .findFirst()
                    .orElse(source.getUser().getDepartment())
            );
        }
        return target;
    }

    @Nullable
    private static Integer getSize(@Nullable List<?> list) {
        return Optional.ofNullable(list).map(List::size).orElse(null);
    }
}
