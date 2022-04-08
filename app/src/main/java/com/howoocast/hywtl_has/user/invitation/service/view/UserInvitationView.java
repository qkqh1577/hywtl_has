package com.howoocast.hywtl_has.user.invitation.service.view;

import com.howoocast.hywtl_has.department.view.DepartmentView;
import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user.invitation.domain.UserInvitation;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInvitationView {

    private String email;
    private String name;
    private DepartmentView department;
    private UserRole userRole;
    private LocalDateTime createdTime;

    public static UserInvitationView assemble(UserInvitation source) {
        UserInvitationView target = new UserInvitationView();
        target.setEmail(source.getEmail());
        target.setName(source.getName());
        target.setDepartment(DepartmentView.assemble(source.getDepartment()));
        target.setUserRole(source.getUserRole());
        target.setCreatedTime(source.getCreatedTime());
        return target;
    }
}
