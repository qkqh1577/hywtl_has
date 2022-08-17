package com.howoocast.hywtl_has.business.controller;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.view.BusinessShortView;
import com.howoocast.hywtl_has.business.view.BusinessView;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;

public final class BusinessMapper {

    public static Page<BusinessShortView> toShortView(Page<Business> page) {
        return page.map(BusinessShortView::assemble);
    }

    public static List<BusinessView> toView(List<Business> list) {
        return list.stream().map(BusinessView::assemble).collect(Collectors.toList());
    }

    public static List<BusinessShortView> toShortView(List<Business> list) {
        return list.stream().map(BusinessShortView::assemble).collect(Collectors.toList());
    }

    public static BusinessView toView(Business instance) {
        return BusinessView.assemble(instance);
    }

    public static BusinessShortView toShortView(Business instance) {
        return BusinessShortView.assemble(instance);
    }
}
