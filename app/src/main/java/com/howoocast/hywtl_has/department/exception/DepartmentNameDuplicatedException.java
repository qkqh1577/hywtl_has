package com.howoocast.hywtl_has.department.exception;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;

public class DepartmentNameDuplicatedException extends CustomExceptionAdaptor {

    public DepartmentNameDuplicatedException() {
        super(
            "department.unique.violation",
            "해당 부서명-유형은 이미 존재합니다."
        );
    }
}
