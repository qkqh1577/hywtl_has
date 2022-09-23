package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.personnel.domain.QPersonnel;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.time.LocalDate;
import java.util.List;
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
        @Nullable String keywordType,
        @Nullable String keyword
    ) {
        if (Objects.isNull(keyword) || keyword.isEmpty()) {
            return this;
        }
        if (Objects.isNull(keywordType) || keywordType.equals("이름")) {
            this.criteria.and(personnel.user.name.containsIgnoreCase(keyword));
        } else if (keywordType.equals("이메일")) {
            this.criteria.and(personnel.user.email.containsIgnoreCase(keyword));
        } else if (keywordType.equals("영문명")) {
            BooleanBuilder criteria = new BooleanBuilder();
            criteria.or(personnel.basic.isNotNull().and(personnel.basic.engName.containsIgnoreCase(keyword)));
            criteria.or(personnel.basic.isNull().and(personnel.user.englishName.containsIgnoreCase(keyword)));
            this.criteria.and(criteria);
        } else if (keywordType.equals("주소")) {
            BooleanBuilder criteria = new BooleanBuilder();
            criteria.or(personnel.basic.isNotNull().and(personnel.basic.address.containsIgnoreCase(keyword)));
            criteria.or(personnel.basic.isNull().and(personnel.user.address.containsIgnoreCase(keyword)));
            this.criteria.and(criteria);

        } else if (keywordType.equals("연락처")) {
            BooleanBuilder criteria = new BooleanBuilder();
            criteria.or(personnel.basic.isNotNull().and(personnel.basic.phone.containsIgnoreCase(keyword)));
            criteria.or(personnel.basic.isNull().and(personnel.user.mobilePhone.containsIgnoreCase(keyword)));
            this.criteria.and(criteria);
        }

        return this;
    }

    public PersonnelPredicateBuilder status(@Nullable List<String> statusList) {
        if (Objects.isNull(statusList) || statusList.isEmpty()) {
            return this;
        }
        criteria.and(personnel.user.status.in(statusList));
        return this;
    }

    public PersonnelPredicateBuilder department(@Nullable List<Long> departmentIdList) {
        if (Objects.isNull(departmentIdList) || departmentIdList.isEmpty()) {
            return this;
        }
        BooleanBuilder criteria = new BooleanBuilder();
        criteria.or(personnel.jobList.isEmpty().and(personnel.user.department.id.in(departmentIdList)));
        criteria.or(personnel.jobList.isNotEmpty().and(personnel.jobList.any().department.id.in(departmentIdList)));
        this.criteria.and(criteria);
        return this;
    }

    public PersonnelPredicateBuilder date(
        @Nullable String dateType,
        @Nullable LocalDate startDate,
        @Nullable LocalDate endDate
    ) {
        if (Objects.isNull(startDate) && Objects.isNull(endDate)) {
            return this;
        }

        if (Objects.isNull(dateType) || dateType.equals("생년월일")) {
            if (Objects.nonNull(startDate)) {
                BooleanBuilder criteria = new BooleanBuilder();
                criteria.or(personnel.basic.isNotNull().and(personnel.basic.birthDate.goe(startDate)));
                criteria.or(personnel.basic.isNull().and(personnel.user.birthDate.goe(startDate)));
                this.criteria.and(criteria);
            }
            if (Objects.nonNull(endDate)) {
                BooleanBuilder criteria = new BooleanBuilder();
                criteria.or(personnel.basic.isNotNull().and(personnel.basic.birthDate.loe(endDate)));
                criteria.or(personnel.basic.isNull().and(personnel.user.birthDate.loe(endDate)));
                this.criteria.and(criteria);
            }
        } else if (dateType.equals("입사일")) {
            if (Objects.nonNull(startDate)) {
                this.criteria.and(personnel.company.hiredDate.goe(startDate));
            }
            if (Objects.nonNull(endDate)) {
                this.criteria.and(personnel.company.hiredDate.loe(endDate));
            }
        } else if (dateType.equals("학력 시작일")) {

            this.criteria.and(personnel.academicList.isNotEmpty());
            if (Objects.nonNull(startDate)) {
                this.criteria.and(personnel.academicList.any().startDate.goe(startDate));
            }
            if (Objects.nonNull(endDate)) {
                this.criteria.and(personnel.academicList.any().startDate.loe(endDate));
            }
        }

        return this;
    }

    public Predicate build() {
        return criteria.getValue();
    }

    private boolean listNotEmpty(@Nullable List<?> list) {
        return Objects.nonNull(list) && !list.isEmpty();
    }


}
