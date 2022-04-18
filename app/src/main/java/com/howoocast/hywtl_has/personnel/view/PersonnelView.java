package com.howoocast.hywtl_has.personnel.view;

import com.howoocast.hywtl_has.personnel.domain.Personnel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonnelView {

    private PersonnelBasicView basic;

    public static PersonnelView assemble(Personnel source) {
        PersonnelView target = new PersonnelView();
        target.basic = PersonnelBasicView.assemble(source.getBasic(), source.getUser().getName());
        return target;
    }
}
