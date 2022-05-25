package com.howoocast.hywtl_has.business.exception;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;

public class BusinessManagerNondeletableException extends CustomExceptionAdaptor {

  public BusinessManagerNondeletableException() {
    super(
        "business-manager.delete.id",
        "해당 업체를 삭제할 수 없습니다."
    );
  }
}
