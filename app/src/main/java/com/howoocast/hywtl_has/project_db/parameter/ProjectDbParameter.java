package com.howoocast.hywtl_has.project_db.parameter;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.apache.commons.collections4.Factory;
import org.apache.commons.collections4.FactoryUtils;
import org.apache.commons.collections4.MapUtils;
import org.apache.commons.collections4.list.LazyList;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class ProjectDbParameter {

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate searchFrom;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate searchTo;

    private Boolean projectEstimate = Boolean.FALSE;
    private Boolean projectComplexSite = Boolean.FALSE;
    private Boolean projectMemo = Boolean.FALSE;
    private Boolean projectBid = Boolean.FALSE;
    private Boolean projectContract = Boolean.FALSE;
    private Map<String, List<String>> keys = new HashMap<>();
    private Map<String, List<String>> values = new HashMap<>();

//    public ProjectDbParameter() {
//        this.search = MapUtils.lazyMap(new HashMap<String,List<Object>>(), new Factory() {
//            public Object create() {
//                return LazyList.lazyList(new ArrayList<KVPair>(),
//                        FactoryUtils.instantiateFactory(KVPair.class));
//            }
//
//        });
//    }



}
