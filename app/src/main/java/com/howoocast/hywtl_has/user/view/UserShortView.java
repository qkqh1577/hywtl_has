package com.howoocast.hywtl_has.user.view;

import com.howoocast.hywtl_has.user.domain.User;
import lombok.Getter;

@Getter
public class UserShortView {

    private Long id;
    private String username;
    private String email;
    private String name;
    private Long departmentId;

    private String departmentName;

    public static UserShortView assemble(User source) {
        UserShortView target = new UserShortView();
        target.id = source.getId();
        target.username = source.getUsername();
        target.email = source.getEmail();
        target.name = source.getName();
        target.departmentId = source.getDepartment().getId();
        target.departmentName = source.getDepartment().getName()
            + source.getDepartment().getCategory().value();

        return target;
    }

}