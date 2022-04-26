package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.common.domain.FileItem;
import com.howoocast.hywtl_has.common.parameter.CustomParameter;
import com.howoocast.hywtl_has.common.parameter.FileItemParameter;
import com.howoocast.hywtl_has.personnel.domain.PersonnelBasic;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Setter
public class PersonnelBasicParameter extends CustomParameter<PersonnelBasic> {

    @NotBlank(message = "personnel.basic.eng-name.not-blank")
    private String engName;

    @NotNull(message = "personnel.basic.birth-date.not-null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    @NotBlank(message = "personnel.basic.sex.not-blank")
    private String sex;

    @Getter
    private FileItemParameter image;

    private String address;

    private String phone;

    private String emergencyPhone;

    private String relationship;

    private String personalEmail;

    private FileItem imageItem;

    public PersonnelBasicParameter imageItem(FileItem imageItem) {
        this.imageItem = imageItem;
        return this;
    }

    public PersonnelBasic build() {
        return PersonnelBasic.of(
            engName,
            birthDate,
            sex,
            imageItem,
            address,
            phone,
            emergencyPhone,
            relationship,
            personalEmail
        );
    }
}
