package com.howoocast.hywtl_has.project_contract.domain;

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
@Table(name = ProjectContractCondition.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectContractCondition extends CustomEntity {

    public static final String KEY = "project_contract_condition";

    private String title;

    @ElementCollection
    private List<String> descriptionList;

    public static ProjectContractCondition of(
        String title,
        List<String> descriptionList
    ) {
        ProjectContractCondition instance = new ProjectContractCondition();
        instance.title = title;
        instance.descriptionList = descriptionList;
        return instance;
    }
}
