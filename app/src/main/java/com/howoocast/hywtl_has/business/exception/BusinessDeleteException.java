package com.howoocast.hywtl_has.business.exception;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;

public class BusinessDeleteException extends CustomExceptionAdaptor {

  public BusinessDeleteException() {
    super(
        "business.manager-list.empty-required",
        "담당자가 존재하는 업체는 삭제할 수 없습니다."
    );
  }
}
