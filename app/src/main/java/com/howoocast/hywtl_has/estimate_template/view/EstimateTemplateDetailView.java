package com.howoocast.hywtl_has.estimate_template.view;

import com.howoocast.hywtl_has.estimate_template.domain.EstimateTemplateDetail;
import com.howoocast.hywtl_has.estimate_template.domain.EstimateUnit;
import java.util.List;
import lombok.Getter;

@Getter
public class EstimateTemplateDetailView {

    private Long id;

    private List<String> titleList;

    private EstimateUnit unit;

    private Long unitAmount;

    private String note;


    public static EstimateTemplateDetailView assemble(EstimateTemplateDetail source) {
        EstimateTemplateDetailView target = new EstimateTemplateDetailView();
        target.id = source.getId();
        target.titleList = source.getTitleList();
        target.unit = source.getUnit();
        target.unitAmount = source.getUnitAmount();
        target.note = source.getNote();
        return target;
    }
}
