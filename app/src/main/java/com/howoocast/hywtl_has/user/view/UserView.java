package com.howoocast.hywtl_has.user.view;

import com.howoocast.hywtl_has.department.view.DepartmentView;
import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDateTime;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class UserView {

    private Long id;
    private String username;
    private String email;
    private String name;
    private DepartmentView department;
    private UserRole role;
    private LocalDateTime createdAt;
    private LocalDateTime loginAt;
    private LocalDateTime passwordChangedAt;

    //    private MultipartFile profile;
    private String englishName;
    private LocalDateTime birthDate;
    private String sex;
    private String mobilePhone;
    private String privateEmail;
    private String emergencyPhone;
    private String relationship;
    private String address;

    public static UserView assemble(User source) {
        UserView target = new UserView();
        target.id = source.getId();
        target.username = source.getUsername();
        target.email = source.getEmail();
        target.name = source.getName();
        target.department = DepartmentView.assemble(source.getDepartment());
        target.role = source.getRole();
        target.createdAt = source.getCreatedAt();
        target.loginAt = source.getLoginAt();
        target.passwordChangedAt = source.getPasswordChangedAt();
        target.englishName = source.getEnglishName();
        target.birthDate = source.getBirthDate();
        target.sex = source.getSex();
        target.mobilePhone = source.getMobilePhone();
        target.privateEmail = source.getPrivateEmail();
        target.emergencyPhone = source.getEmergencyPhone();
        target.relationship = source.getRelationship();
        target.address = source.getAddress();
        return target;
    }
}
