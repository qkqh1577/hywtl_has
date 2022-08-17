package com.howoocast.hywtl_has.personnel.view;

import com.howoocast.hywtl_has.personnel.domain.PersonnelLicense;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonnelLicenseView {

    private String name;
    private String type;
    private String organizationName;
    private String qualifiedNumber;
    private LocalDate qualifiedDate;
    private String note;

    public static PersonnelLicenseView assemble(PersonnelLicense source) {
        PersonnelLicenseView target = new PersonnelLicenseView();
        target.name = source.getName();
        target.type = source.getType();
        target.organizationName = source.getOrganizationName();
        target.qualifiedNumber = source.getQualifiedNumber();
        target.qualifiedDate = source.getQualifiedDate();
        target.note = source.getNote();
        return target;
    }
}
