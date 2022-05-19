package com.howoocast.hywtl_has.serviceItem.parameter;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ServiceItemParameter {
  private Integer orderNumber;
  private String item; // 용역항목명
  private String unit; // 단위(기본값)
  private Long price; // 단가(기본값)
  private String memo; // 비고(기본값)
  private String type; // 실험타입
  private List<ServiceDetailItemParameter> serviceDetailItemParameterList;
}
