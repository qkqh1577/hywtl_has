package com.howoocast.hywtl_has.serviceItem.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;

@Slf4j
@Getter
@Entity
@Table(name = "service_detail_item")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update service_detail_item set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ServiceDetailItem extends CustomEntity {

  private String item;  // 세부 항목명
  
  private Boolean directInputUseYn; // 직접입력 사용여부
  
  private String unit; // 단위
  
  private Long price; // 단가
  
  private String memo; // 메모
  
  private Integer orderNumber; // 순서

  public static ServiceDetailItem of(
      String item,
      Boolean directInputUseYn,
      String unit,
      Long price,
      String memo,
      Integer orderNumber
  ) {
    ServiceDetailItem instance = new ServiceDetailItem();
    instance.item = item;
    instance.directInputUseYn = directInputUseYn;
    instance.unit = unit;
    instance.price = price;
    instance.memo = memo;
    instance.orderNumber = orderNumber;
    return instance;
  }

  public void change(
      String item,
      Boolean directInputUseYn,
      String unit,
      Long price,
      String memo,
      Integer orderNumber
  ) {
    this.item = item;
    this.directInputUseYn = directInputUseYn;
    this.unit = unit;
    this.price = price;
    this.memo = memo;
    this.orderNumber = orderNumber;
  }
}
