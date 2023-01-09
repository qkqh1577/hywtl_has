package com.howoocast.hywtl_has.address.repository;

import static com.howoocast.hywtl_has.address.domain.QAddress.address;

import com.howoocast.hywtl_has.address.domain.Address;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import javax.persistence.EntityManager;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

@Repository
public class AddressSearchRepositoryImpl implements AddressSearchRepository {

    private final JPAQueryFactory queryFactory;

    public AddressSearchRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Address> search(String code) {
        return queryFactory.selectFrom(address)
            .where(isPatterned(code))
            .fetch();
    }

    private BooleanExpression isPatterned(String code) {
        if (code.matches("^[0-9]{5}00000$")) {
            return StringUtils.hasText(code) ? address.code.startsWith(code.substring(0, 2)) : null;
        } else if (code.matches("^00000000$")) {
            return StringUtils.hasText(code) ? address.code.endsWith(code) : null;
        } else {
            return null;
        }
    }
}
