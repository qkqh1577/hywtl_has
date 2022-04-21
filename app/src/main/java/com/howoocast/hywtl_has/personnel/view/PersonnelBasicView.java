package com.howoocast.hywtl_has.personnel.view;

import com.howoocast.hywtl_has.common.view.FileItemView;
import com.howoocast.hywtl_has.personnel.domain.PersonnelBasic;
import java.time.LocalDate;
import java.util.Objects;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

@Getter
@Setter
public class PersonnelBasicView {

    private String engName;

    private LocalDate birthDate;

    private String sex;

    private FileItemView image;

    private String address;

    private String phone;

    private String emergencyPhone;

    private String relationship;

    private String personalEmail;

    public static PersonnelBasicView assemble(@Nullable PersonnelBasic source) {
        PersonnelBasicView target = new PersonnelBasicView();
        if (Objects.isNull(source)) {
            return target;
        }
        target.engName = source.getEngName();
        target.birthDate = source.getBirthDate();
        target.sex = source.getSex();
        target.image = FileItemView.assemble(source.getImage());
        target.address = source.getAddress();
        target.phone = source.getPhone();
        target.emergencyPhone = source.getEmergencyPhone();
        target.relationship = source.getRelationship();
        target.personalEmail = source.getPersonalEmail();
        return target;
    }
}
