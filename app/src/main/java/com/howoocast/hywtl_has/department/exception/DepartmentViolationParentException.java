package com.howoocast.hywtl_has.department.exception;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;
import com.howoocast.hywtl_has.department.domain.Department;

public class DepartmentViolationParentException extends CustomExceptionAdaptor {

    public DepartmentViolationParentException() {
        super(
            Department.KEY + ".reference_violation",
            "자신의 하위 조직을 상위 조직으로 선택할 수 없습니다."
        );
    }
}
