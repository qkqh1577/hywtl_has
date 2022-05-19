package com.howoocast.hywtl_has.serviceItem.parameter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServiceDetailItemParameter {
  private Boolean directInputUseYn; // 직접입력 사용여부
  private String item; // 세부 항목명
  private String unit; // 단위
  private Long price; // 단가
  private String memo; // 비고
  private Integer orderNumber; // 순서
}
