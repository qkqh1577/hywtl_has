package com.howoocast.hywtl_has.serviceItem.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.List;

@Slf4j
@Getter
@Entity
@Table(name = "service_item")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update service_item set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ServiceItem extends CustomEntity {

  private String item;  // 용역항목명

  private String unit; // 단위(기본값)
  
  private Long price; // 단가(기본값)
  
  private String memo; // 비고(기본값)
  
  private String type; // 실험타입

  private Integer orderNumber; // 순서

  @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.ALL})
  private List<ServiceDetailItem> serviceDetailItemList; // 용역 세부항목 목록

  public static ServiceItem of(
      String item,
      String unit,
      Long price,
      String memo,
      String type,
      Integer orderNumber,
      List<ServiceDetailItem> serviceDetailItemList
  ) {
    ServiceItem instance = new ServiceItem();
    instance.item = item;
    instance.unit = unit;
    instance.price = price;
    instance.memo = memo;
    instance.type = type;
    instance.orderNumber = orderNumber;
    instance.serviceDetailItemList = serviceDetailItemList;
    return instance;
  }

  public void change(
      String item,
      String unit,
      Long price,
      String memo,
      String type,
      List<ServiceDetailItem> serviceDetailItemList
  ) {
    this.item = item;
    this.unit = unit;
    this.price = price;
    this.memo = memo;
    this.type = type;
    this.serviceDetailItemList = serviceDetailItemList;
  }
}
