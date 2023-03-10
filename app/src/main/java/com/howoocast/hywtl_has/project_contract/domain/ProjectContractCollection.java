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
@Table(name = ProjectContractCollection.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectContractCollection extends CustomEntity {

    public static final String KEY = "project_contract_collection";


    /**
     * 기성 단계 비고
     */
    private String stageNote;

    /**
     * 단계
     */
    @ElementCollection
    private List<ProjectContractCollectionStage> stageList;

    /**
     * 총액에 대한 설명
     */
    private String totalAmountNote;

    /**
     * 총액
     */
    private Long totalAmount;

    public static ProjectContractCollection of(
        String stageNote,
        List<ProjectContractCollectionStage> stageList,
        String totalAmountNote,
        Long totalAmount
    ) {
        ProjectContractCollection instance = new ProjectContractCollection();
        instance.stageNote = stageNote;
        instance.stageList = stageList;
        instance.totalAmountNote = totalAmountNote;
        instance.totalAmount = totalAmount;
        return instance;
    }
}
