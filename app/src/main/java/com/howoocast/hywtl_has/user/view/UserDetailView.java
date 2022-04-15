package com.howoocast.hywtl_has.user.view;

import com.howoocast.hywtl_has.department.view.DepartmentView;
import com.howoocast.hywtl_has.personnel.domain.Personnel;
import com.howoocast.hywtl_has.personnel.view.PersonnelView;
import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class UserDetailView {

    private Long id;
    private String username;
    private String email;
    private String name;
    private DepartmentView department;
    private UserRole userRole;
    private LocalDateTime createdTime;
    private LocalDateTime loginTime;
    private LocalDateTime passwordChangedTime;

    private PersonnelView personnel;

    public static UserDetailView assemble(User source) {
        UserDetailView target = new UserDetailView();
        target.id = source.getId();
        target.username = source.getUsername();
        target.email = source.getEmail();
        target.name = source.getName();
        target.department = DepartmentView.assemble(source.getDepartment());
        target.userRole = source.getUserRole();
        target.createdTime = source.getCreatedTime();
        target.loginTime = source.getLoginTime();
        target.passwordChangedTime = source.getPasswordChangedTime();
        target.personnel = PersonnelView.assemble(source.getPersonnel());
        return target;
    }
}
