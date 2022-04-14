package com.howoocast.hywtl_has.department.exception;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;

public class DepartmentViolationParentException extends CustomExceptionAdaptor {

    public DepartmentViolationParentException() {
        super("자신의 하위 부서를 상위 부서로 선택할 수 없습니다.");
    }
}
