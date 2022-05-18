package com.howoocast.hywtl_has.serviceItem.view;

import com.howoocast.hywtl_has.serviceItem.domain.ServiceDetailItem;
import lombok.Getter;

@Getter
public class ServiceDetailItemView {
  private String item; // 용역항목명
  private String unit; // 단위
  private Long price; // 단가
  private String memo; // 비고
  private Integer order; // 순서

  public static ServiceDetailItemView assemble(ServiceDetailItem serviceDetailItem) {
    ServiceDetailItemView target = new ServiceDetailItemView();

    target.item = serviceDetailItem.getItem();
    target.unit = serviceDetailItem.getUnit();
    target.price = serviceDetailItem.getPrice();
    target.memo = serviceDetailItem.getMemo();
    target.order = serviceDetailItem.getOrderNumber();

    return target;
  }
}
