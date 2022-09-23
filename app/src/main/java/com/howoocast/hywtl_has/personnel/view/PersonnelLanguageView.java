package com.howoocast.hywtl_has.personnel.view;

import com.howoocast.hywtl_has.personnel.domain.PersonnelLanguage;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonnelLanguageView {

    private String name;
    private String type;
    private String grade;
    private String organizationName;
    private LocalDate certifiedDate;
    private String expiryPeriod;

    public static PersonnelLanguageView assemble(PersonnelLanguage source) {
        PersonnelLanguageView target = new PersonnelLanguageView();
        target.name = source.getName();
        target.type = source.getType();
        target.grade = source.getGrade();
        target.organizationName = source.getOrganizationName();
        target.certifiedDate = source.getCertifiedDate();
        target.expiryPeriod = source.getExpiryPeriod();
        return target;
    }
}
