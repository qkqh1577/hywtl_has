package com.howoocast.hywtl_has.serviceItem.view;

import com.howoocast.hywtl_has.serviceItem.domain.ServiceItem;
import lombok.Getter;

@Getter
public class ServiceItemOrderListView {
  Integer orderNumber;
  String type;
  String item;

  public static ServiceItemOrderListView assemble(ServiceItem serviceItem) {
    ServiceItemOrderListView target = new ServiceItemOrderListView();

    target.orderNumber = serviceItem.getOrderNumber();
    target.type = serviceItem.getType();
    target.item = serviceItem.getItem();

    return target;
  }
}
