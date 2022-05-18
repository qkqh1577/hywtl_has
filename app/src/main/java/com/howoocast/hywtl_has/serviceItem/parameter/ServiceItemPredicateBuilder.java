package com.howoocast.hywtl_has.serviceItem.parameter;

import com.howoocast.hywtl_has.serviceItem.domain.QServiceItem;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import org.springframework.lang.Nullable;

import java.util.Objects;

public class ServiceItemPredicateBuilder {

  private static final QServiceItem serviceItem = QServiceItem.serviceItem;

  private final BooleanBuilder criteria = new BooleanBuilder();

  public ServiceItemPredicateBuilder typeAndItem(@Nullable String type, @Nullable String keyword) {

    if ((Objects.isNull(type) || type.trim().isEmpty())
        && (Objects.isNull(keyword) || keyword.trim().isEmpty())) {
      return this;
    }

    final String keywordStr = keyword.trim();

    criteria.and(serviceItem.type.containsIgnoreCase(type));
    criteria.and(serviceItem.item.containsIgnoreCase(keywordStr));

    return this;
  }

  @Nullable
  public Predicate build() {
    return criteria.getValue();
  }
}