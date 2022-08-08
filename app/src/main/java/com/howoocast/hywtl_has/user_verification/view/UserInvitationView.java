package com.howoocast.hywtl_has.user_verification.view;

import com.howoocast.hywtl_has.department.view.DepartmentView;
import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user_verification.domain.UserInvitation;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class UserInvitationView {

    private String email;
    private String name;
    private DepartmentView department;
    private UserRole role;

    private LocalDateTime createdAt;

    public static UserInvitationView assemble(UserInvitation source) {
        UserInvitationView target = new UserInvitationView();
        target.email = source.getEmail();
        target.name = source.getName();
        target.department = DepartmentView.assemble(source.getDepartment());
        target.role = source.getRole();
        target.createdAt = source.getCreatedAt();
        return target;
    }
}
