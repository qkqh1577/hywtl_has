package com.howoocast.hywtl_has.contract_collection.domain;


import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.util.ArrayList;
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
@Table(name = ContractCollection.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContractCollection extends CustomEntity {

    public static final String KEY = "contract_collection";

    /**
     * 단계
     */
    @ElementCollection
    private List<ContractCollectionStage> stageList;

    /**
     * 총액에 대한 설명
     */
    private String totalAmountNote;

    public static ContractCollection of() {
        ContractCollection instance = new ContractCollection();
        instance.stageList = new ArrayList<>();
        return instance;
    }

    public void change(
        List<ContractCollectionStage> stageList,
        String totalAmountNote
    ) {
        this.stageList = stageList;
        this.totalAmountNote = totalAmountNote;
    }

    /**
     * @migration
     * @param stageList
     */
    public void change(
        List<ContractCollectionStage> stageList
    ) {
        this.stageList = stageList;
    }

}
