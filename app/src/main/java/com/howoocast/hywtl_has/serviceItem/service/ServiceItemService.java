package com.howoocast.hywtl_has.serviceItem.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.serviceItem.domain.ServiceDetailItem;
import com.howoocast.hywtl_has.serviceItem.domain.ServiceItem;
import com.howoocast.hywtl_has.serviceItem.parameter.ServiceItemParameter;
import com.howoocast.hywtl_has.serviceItem.repository.ServiceItemRepository;
import com.howoocast.hywtl_has.serviceItem.view.ServiceItemListView;
import com.howoocast.hywtl_has.serviceItem.view.ServiceItemOrderListView;
import com.howoocast.hywtl_has.serviceItem.view.ServiceItemView;
import com.querydsl.core.types.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@Service
@RequiredArgsConstructor
public class ServiceItemService {

  private final ServiceItemRepository serviceItemRepository;

  @Transactional(readOnly = true)
  public List<ServiceItemListView> getList(@Nullable Predicate predicate) {
    Iterable<ServiceItem> serviceItems = Optional.ofNullable(predicate)
        .map(p -> serviceItemRepository.findAll(p))
        .orElse(serviceItemRepository.findAll());
    return StreamSupport.stream(serviceItems.spliterator(),false)
        .map(ServiceItemListView::assemble)
        .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public List<ServiceItemOrderListView> getOrderList() {
    List<ServiceItem> serviceItem = serviceItemRepository.findAll();
    return serviceItem.stream().map(ServiceItemOrderListView::assemble)
        .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public ServiceItemView get(Long id) {
    ServiceItem serviceItem = serviceItemRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("serviceItem", id));
    return ServiceItemView.assemble(serviceItem);
  }

  @Transactional
  public void add(ServiceItemParameter params) {
    List<ServiceDetailItem> serviceDetailItemList = Optional.ofNullable(params.getServiceDetailItemParameterList()).map(
        list -> list.stream()
            .map(serviceDetailItem -> ServiceDetailItem.of(
                serviceDetailItem.getItem(),
                serviceDetailItem.getDirectInputUseYn(),
                serviceDetailItem.getUnit(),
                serviceDetailItem.getPrice(),
                serviceDetailItem.getMemo(),
                serviceDetailItem.getOrder()
            )).collect(Collectors.toList())
    ).orElse(Collections.emptyList());

    ServiceItem.of(
        params.getItem(),
        params.getUnit(),
        params.getPrice(),
        params.getMemo(),
        params.getType(),
        serviceDetailItemList
    );
  }

  @Transactional
  public void change(Long id, ServiceItemParameter params) {
    ServiceItem serviceItem = serviceItemRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("serviceItem", id));
    serviceItem.change(
        params.getItem(),
        params.getUnit(),
        params.getPrice(),
        params.getMemo(),
        params.getType(),
        params.getServiceDetailItemParameterList().stream().map(
            serviceDetailItem -> ServiceDetailItem.of(
                serviceDetailItem.getItem(),
                serviceDetailItem.getDirectInputUseYn(),
                serviceDetailItem.getUnit(),
                serviceDetailItem.getPrice(),
                serviceDetailItem.getMemo(),
                serviceDetailItem.getOrder()
            )).collect(Collectors.toList())
    );

  }

  @Transactional
  public void delete(Long id) {
    serviceItemRepository.findById(id).ifPresent(
        serviceItem -> serviceItemRepository.deleteById(id)
    );
  }
}
