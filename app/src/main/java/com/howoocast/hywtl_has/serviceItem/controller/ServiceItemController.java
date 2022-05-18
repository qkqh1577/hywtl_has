package com.howoocast.hywtl_has.serviceItem.controller;

import com.howoocast.hywtl_has.serviceItem.parameter.ServiceItemParameter;
import com.howoocast.hywtl_has.serviceItem.parameter.ServiceItemPredicateBuilder;
import com.howoocast.hywtl_has.serviceItem.service.ServiceItemService;
import com.howoocast.hywtl_has.serviceItem.view.ServiceItemListView;
import com.howoocast.hywtl_has.serviceItem.view.ServiceItemOrderListView;
import com.howoocast.hywtl_has.serviceItem.view.ServiceItemView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ServiceItemController {

  private final ServiceItemService serviceItemService;

  @GetMapping("/serviceItems")
  public List<ServiceItemListView> getList(
      @RequestParam(required = false) String type,
      @RequestParam(required = false) String item
  ) {
    return serviceItemService.getList(
        new ServiceItemPredicateBuilder()
            .typeAndItem(type, item)
            .build()
    );
  }

  @GetMapping("/serviceItems/order")
  public List<ServiceItemOrderListView> getOrderList() {
    return serviceItemService.getOrderList();
  }

  @GetMapping("/serviceItems/{id}")
  public ServiceItemView get(@PathVariable Long id) { return serviceItemService.get(id); }

  @PostMapping("/serviceItems")
  public void add(@Valid @RequestBody ServiceItemParameter params) {
    serviceItemService.add(params);
  }

  @PatchMapping("/serviceItems/{id}")
  public void change(
      @PathVariable Long id,
      @Valid @RequestBody ServiceItemParameter params
  ) {
    serviceItemService.change(id, params);
  }

  @DeleteMapping("/serviceItems/{id}")
  public void delete(@PathVariable Long id) {
    serviceItemService.delete(id);
  }

}
