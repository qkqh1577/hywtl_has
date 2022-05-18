package com.howoocast.hywtl_has.serviceItem.view;

import com.howoocast.hywtl_has.serviceItem.domain.ServiceItem;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class ServiceItemView {
  String item; // 용역항목명
  String unit; // 단위
  Long price; // 단가
  String memo; // 비고
  List<ServiceDetailItemView> serviceDetailItemViewList;

  public static ServiceItemView assemble(ServiceItem serviceItem) {
    ServiceItemView target = new ServiceItemView();

    target.item = serviceItem.getItem();
    target.unit = serviceItem.getUnit();
    target.price = serviceItem.getPrice();
    target.memo = serviceItem.getMemo();
    target.serviceDetailItemViewList = serviceItem.getServiceDetailItemList()
        .stream().map(ServiceDetailItemView::assemble)
        .collect(Collectors.toList());
    return target;
  }

}
