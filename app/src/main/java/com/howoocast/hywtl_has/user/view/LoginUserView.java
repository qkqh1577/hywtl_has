package com.howoocast.hywtl_has.user.view;

import com.howoocast.hywtl_has.file.view.FileItemView;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDate;
import java.util.Objects;
import lombok.Getter;

@Getter
public class LoginUserView {

    private Long id;
    private String username;
    private String email;
    private String name;
    private String engName;
    private LocalDate birthDate;
    private String sex;
    private String mobilePhone;
    private String privateEmail;
    private String emergencyPhone;
    private String relationship;
    private String address;

    private FileItemView profile;

    public static LoginUserView assemble(User source) {
        LoginUserView target = new LoginUserView();
        target.id = source.getId();
        target.username = source.getUsername();
        target.email = source.getEmail();
        target.name = source.getName();
        target.engName = source.getEngName();
        target.birthDate = source.getBirthDate();
        target.sex = source.getSex();
        target.mobilePhone = source.getMobilePhone();
        target.privateEmail = source.getPrivateEmail();
        target.emergencyPhone = source.getEmergencyPhone();
        target.relationship = source.getRelationship();
        target.address = source.getAddress();
        if (Objects.nonNull(source.getProfile())) {
            target.profile = FileItemView.assemble(source.getProfile());
        }
        return target;
    }
}
