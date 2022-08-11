package com.howoocast.hywtl_has.estimate_template.view;

import com.howoocast.hywtl_has.estimate_template.domain.EstimateTemplateDetail;
import java.util.List;
import lombok.Getter;

@Getter
public class EstimateTemplateDetailView {

    private Long id;

    private List<String> titleList;

    private String unit;

    private Long unitPrice;

    private String memo;


    public static EstimateTemplateDetailView assemble(EstimateTemplateDetail source) {
        EstimateTemplateDetailView target = new EstimateTemplateDetailView();
        target.id = source.getId();
        target.titleList = source.getTitleList();
        target.unit = source.getUnit();
        target.unitPrice = source.getUnitPrice();
        target.memo = source.getMemo();
        return target;
    }
}
