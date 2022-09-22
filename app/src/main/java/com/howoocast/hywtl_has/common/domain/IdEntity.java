package com.howoocast.hywtl_has.common.domain;

import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import javax.annotation.Nullable;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@MappedSuperclass
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class IdEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    public static <T extends IdEntity> T of(Long id, Class<T> type) {
        try {

            T instance = type.getDeclaredConstructor().newInstance();
            instance.id = id;
            return instance;
        } catch (Exception e) {
            e.printStackTrace();
            throw new IllegalRequestException(
                "system.class.default_constructor.access_denied",
                "기본 생성자를 생성할 수 없었습니다."
            );
        }

    }

    @Nullable
    public final Long getId() {
        return this.id;
    }
}
