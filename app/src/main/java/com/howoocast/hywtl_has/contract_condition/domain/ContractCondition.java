package com.howoocast.hywtl_has.contract_condition.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.util.List;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;

@Slf4j
@Getter
@Entity
@Table(name = ContractCondition.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContractCondition extends CustomEntity {

    public static final String KEY = "contract_condition";

    /**
     * 제목
     */
    private String title;

    /**
     * 내용
     */
    @ElementCollection
    private List<String> descriptionList;

    public static ContractCondition of(
        String title,
        List<String> descriptionList
    ) {
        ContractCondition instance = new ContractCondition();
        instance.change(title, descriptionList);
        return instance;
    }


    public void change(
        String title,
        List<String> descriptionList
    ) {
        this.title = title;
        this.descriptionList = descriptionList;
    }
}
