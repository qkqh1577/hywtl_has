package com.howoocast.hywtl_has.user.view;

import com.howoocast.hywtl_has.department.view.DepartmentView;
import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class UserView {

    private Long id;
    private String username;
    private String email;
    private String name;
    private DepartmentView department;
    private UserRole userRole;
    private LocalDateTime createdAt;
    private LocalDateTime loginAt;
    private LocalDateTime passwordChangedAt;

    public static UserView assemble(User source) {
        UserView target = new UserView();
        target.id = source.getId();
        target.username = source.getUsername();
        target.email = source.getEmail();
        target.name = source.getName();
        target.department = DepartmentView.assemble(source.getDepartment());
        target.userRole = source.getUserRole();
        target.createdAt = source.getCreatedAt();
        target.loginAt = source.getLoginAt();
        target.passwordChangedAt = source.getPasswordChangedAt();
        return target;
    }
}
