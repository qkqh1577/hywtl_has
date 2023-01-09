package com.howoocast.hywtl_has.address.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@Table(name = Address.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Address extends CustomEntity {

    public static final String KEY = "address";
    /**
     * 행정동코드
     */
    @Column(unique = true, nullable = false)
    String code;
    /**
     * 시도명
     */
    String depth1;

    /**
     * 시군구명
     */
    String depth2;

    public static Address of(
        String code,
        String depth1,
        @Nullable String depth2) {
        Address address = new Address();
        address.code = code;
        address.depth1 = depth1;
        address.depth2 = depth2;
        return address;
    }
}
