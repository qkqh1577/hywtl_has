package com.howoocast.hywtl_has.personnel.view;

import com.howoocast.hywtl_has.personnel.domain.PersonnelCompany;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonnelCompanyView {

    private LocalDate hiredDate;
    private String hiredType;
    private String recommender;

    public static PersonnelCompanyView assemble(PersonnelCompany source) {
        PersonnelCompanyView target = new PersonnelCompanyView();
        target.hiredDate = source.getHiredDate();
        target.hiredType = source.getHiredType();
        target.recommender = source.getRecommender();
        return target;
    }
}
