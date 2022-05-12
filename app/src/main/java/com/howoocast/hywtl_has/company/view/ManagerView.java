package com.howoocast.hywtl_has.company.view;

import com.howoocast.hywtl_has.company.domain.Manager;
import lombok.Getter;

@Getter
public class ManagerView {
    Long id;
    String name; // 담당자명
    String position; // 호칭
    String mobile; // 핸드폰
    String phone; // 전화번호
    String email; // 이메일
    String state; // 상태

    public static ManagerView assemble(Manager manager) {
        ManagerView target = new ManagerView();

        target.id = manager.getId();
        target.name = manager.getName();
        target.position = manager.getPosition();
        target.mobile = manager.getMobile();
        target.phone = manager.getPhone();
        target.email = manager.getEmail();
        target.state = manager.getState();

        return target;
    }
}
