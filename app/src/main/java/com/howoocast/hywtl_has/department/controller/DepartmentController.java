package com.howoocast.hywtl_has.department.controller;

import com.howoocast.hywtl_has.department.common.DepartmentCategory;
import com.howoocast.hywtl_has.department.parameter.DepartmentAddParameter;
import com.howoocast.hywtl_has.department.parameter.DepartmentChangeParameter;
import com.howoocast.hywtl_has.department.parameter.DepartmentPredicateBuilder;
import com.howoocast.hywtl_has.department.service.DepartmentService;
import com.howoocast.hywtl_has.department.view.DepartmentListView;
import com.howoocast.hywtl_has.department.view.DepartmentView;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping("/departments")
    public Page<DepartmentListView> page(
        @RequestParam(required = false, name="parentId[]") List<Long> parentIdList,
        @RequestParam(required = false, name="category[]") List<DepartmentCategory> categoryList,
        @RequestParam(required = false) String keywordType,
        @RequestParam(required = false) String keyword,
        @SortDefault.SortDefaults({
            @SortDefault(sort ="parent.id", direction = Sort.Direction.ASC),
            @SortDefault(sort ="seq", direction = Sort.Direction.ASC),
        }) Pageable pageable) {
        return departmentService.page(
            new DepartmentPredicateBuilder()
                .parentIdIn(parentIdList)
                .categoryIn(categoryList)
                .keyword(keywordType, keyword)
                .build(),
            pageable
        );
    }

    @GetMapping(value = "/departments/all")
    public List<DepartmentListView> list() {
        return departmentService.list();
    }

    @GetMapping("/departments/{id}")
    public DepartmentView get(@PathVariable Long id) {
        return departmentService.get(id);
    }

    @PostMapping("/departments")
    public DepartmentView add(@Valid @RequestBody DepartmentAddParameter params) {
        return departmentService.add(params);
    }

    @PatchMapping("/departments/{id}")
    public DepartmentView change(@PathVariable Long id, @Valid @RequestBody DepartmentChangeParameter params) {
        return departmentService.change(id, params);
    }


}
