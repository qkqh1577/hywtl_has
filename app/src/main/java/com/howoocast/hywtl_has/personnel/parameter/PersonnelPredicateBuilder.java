package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.personnel.domain.QPersonnel;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.DatePath;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.springframework.lang.Nullable;

public class PersonnelPredicateBuilder {

    private static final QPersonnel personnel = QPersonnel.personnel;

    private final BooleanBuilder criteria = new BooleanBuilder();

    public PersonnelPredicateBuilder sex(@Nullable List<String> sexList) {
        if (listNotEmpty(sexList)) {
            criteria.and(personnel.basic.sex.in(sexList));
        }
        return this;
    }

    public PersonnelPredicateBuilder hiredType(@Nullable List<String> hiredTypeList) {
        if (listNotEmpty(hiredTypeList)) {
            criteria.and(personnel.company.hiredType.in(hiredTypeList));
        }
        return this;
    }

    public PersonnelPredicateBuilder keyword(
        @Nullable List<String> keywordTypeList,
        @Nullable String keyword
    ) {
        if (Objects.isNull(keyword) || keyword.isEmpty()) {
            return this;
        }
        Map<String, BooleanExpression> map = new HashMap<>();
        map.put("이름", personnel.user.name.containsIgnoreCase(keyword));
        map.put("이메일", personnel.user.email.containsIgnoreCase(keyword));
        map.put("영문명", personnel.basic.engName.containsIgnoreCase(keyword));
        map.put("주소", personnel.basic.address.containsIgnoreCase(keyword));
        map.put("연락처", personnel.basic.phone.containsIgnoreCase(keyword));

        BooleanBuilder keywordCriteria = new BooleanBuilder();

        if (Objects.isNull(keywordTypeList) || keywordTypeList.isEmpty()) {
            for (String key : map.keySet()) {
                BooleanExpression expression = map.get(key);
                if (Objects.nonNull(expression)) {
                    keywordCriteria.or(expression);
                }
            }
        } else {
            for (String key : keywordTypeList) {
                BooleanExpression expression = map.get(key);
                if (Objects.nonNull(expression)) {
                    keywordCriteria.or(expression);
                }
            }
        }
        criteria.and(keywordCriteria);
        return this;
    }

    public PersonnelPredicateBuilder date(
        @Nullable List<String> dateTypeList,
        @Nullable LocalDate startDate,
        @Nullable LocalDate endDate
    ) {
        if (Objects.isNull(startDate) && Objects.isNull(endDate)) {
            return this;
        }

        Map<String, BooleanExpression> map = new HashMap<>();
        map.put("생년월일", between(personnel.basic.birthDate, startDate, endDate));
        map.put("입사일", between(personnel.company.hiredDate, startDate, endDate));
        map.put("학력 시작일", between(personnel.academicList.any().startDate, startDate, endDate));

        BooleanBuilder dateCriteria = new BooleanBuilder();

        if (Objects.isNull(dateTypeList) || dateTypeList.isEmpty()) {
            for (String key : map.keySet()) {
                BooleanExpression expression = map.get(key);
                if (Objects.nonNull(expression)) {
                    dateCriteria.or(expression);
                }
            }
        } else {
            for (String key : dateTypeList) {
                BooleanExpression expression = map.get(key);
                if (Objects.nonNull(expression)) {
                    dateCriteria.or(expression);
                }
            }
        }
        criteria.and(dateCriteria);
        return this;
    }

    public Predicate build() {
        return criteria.getValue();
    }

    private BooleanExpression between(
        DatePath<LocalDate> query,
        @Nullable LocalDate startDate,
        @Nullable LocalDate endDate
    ) {
        if (Objects.isNull(startDate)) {
            return query.loe(endDate);
        }
        if (Objects.isNull(endDate)) {
            return query.goe(startDate);
        }
        return query.between(startDate, endDate);
    }

    private boolean listNotEmpty(@Nullable List<?> list) {
        return Objects.nonNull(list) && !list.isEmpty();
    }


}
