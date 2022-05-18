package com.howoocast.hywtl_has.serviceItem.view;

import com.howoocast.hywtl_has.serviceItem.domain.ServiceItem;
import lombok.Getter;

@Getter
public class ServiceItemListView {
  private Integer order; // 순서
  private String type; // 실험타입
  private String item; // 용역항목명
  private Integer detailItemCount; // 세부항목 수
  private String unit; // 단위
  private Long price; // 단가
  private String memo; // 비고

  public static ServiceItemListView assemble(ServiceItem source) {
    ServiceItemListView target = new ServiceItemListView();
    target.order = source.getOrder();
    target.type = source.getType();
    target.item = source.getItem();
    target.detailItemCount = source.getServiceDetailItemList().size();
    target.unit = source.getUnit();
    target.price = source.getPrice();
    target.memo = source.getMemo();
    return target;
  }
}
