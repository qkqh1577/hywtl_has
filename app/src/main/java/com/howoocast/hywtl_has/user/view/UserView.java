package com.howoocast.hywtl_has.user.view;

import com.howoocast.hywtl_has.department.view.DepartmentView;
import com.howoocast.hywtl_has.user.domain.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserView {

    private Long id;
    private String username;
    private String email;
    private String name;
    private DepartmentView department;

    public static UserView assemble(User source) {
        UserView target = new UserView();
        target.setId(source.getId());
        target.setUsername(source.getUsername());
        target.setEmail(source.getEmail());
        target.setName(source.getName());
        target.setDepartment(DepartmentView.assemble(source.getDepartment()));

        return target;
    }

}
