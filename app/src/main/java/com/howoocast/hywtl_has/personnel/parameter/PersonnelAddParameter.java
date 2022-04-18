package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.common.domain.FileItem;
import com.howoocast.hywtl_has.personnel.domain.Personnel;
import com.howoocast.hywtl_has.personnel.domain.PersonnelBasic;
import com.howoocast.hywtl_has.personnel.repository.PersonnelRepository;
import com.howoocast.hywtl_has.user.domain.User;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class PersonnelAddParameter {

    @Getter
    @Setter
    public static class PersonnelBasicAddParameter {

        private String engName;
        private String birthDate;
        private String sex;
        private MultipartFile imageFile;
        private String address;

        private String phone;
        private String emergencyPhone;
        private String relationship;
        private String personalEmail;

        public PersonnelBasic assemble(
            FileItem imageFile
        ) {
            return PersonnelBasic.of(
                engName,
                birthDate,
                sex,
                imageFile,
                address,
                phone,
                emergencyPhone,
                relationship,
                personalEmail
            );
        }
    }

    @NotNull(message = "유저 선택은 필수입니다.")
    private Long userId;

    @NotNull(message = "유저 기본 정보는 필수입니다.")
    private PersonnelBasicAddParameter basic;

    public Personnel assemble(
        PersonnelRepository repository,
        User user,
        FileItem imageFile
    ) {
        return Personnel.of(
            repository,
            user,
            basic.assemble(imageFile)
        );
    }

}
