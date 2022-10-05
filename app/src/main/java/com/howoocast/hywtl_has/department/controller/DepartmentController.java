package com.howoocast.hywtl_has.department.controller;

import com.howoocast.hywtl_has.department.common.DepartmentCategory;
import com.howoocast.hywtl_has.department.parameter.DepartmentChangeTreeParameter;
import com.howoocast.hywtl_has.department.parameter.DepartmentParameter;
import com.howoocast.hywtl_has.department.parameter.DepartmentPredicateBuilder;
import com.howoocast.hywtl_has.department.service.DepartmentService;
import com.howoocast.hywtl_has.department.view.DepartmentItemView;
import com.howoocast.hywtl_has.department.view.DepartmentShortView;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService service;

    @GetMapping("/department")
    public Page<DepartmentShortView> page(
        @RequestParam(required = false, name = "parentId[]") List<Long> parentIdList,
        @RequestParam(required = false, name = "category[]") List<DepartmentCategory> categoryList,
        @RequestParam(required = false) String keywordType,
        @RequestParam(required = false) String keyword,
        @SortDefault.SortDefaults({
            @SortDefault(sort = "parent.id", direction = Sort.Direction.ASC),
            @SortDefault(sort = "seq", direction = Sort.Direction.ASC),
        }) Pageable pageable) {
        return service.page(
            new DepartmentPredicateBuilder()
                .parentIdIn(parentIdList)
                .categoryIn(categoryList)
                .keyword(keywordType, keyword)
                .build(),
            pageable
        );
    }

    @GetMapping(value = "/department", params = "type")
    public List<? extends DepartmentItemView> list(@RequestParam String type) {
        if (type.equals("as_list")) {
            return service.list();
        }
        return service.itemList();
    }

    @GetMapping("/department/{id}")
    public DepartmentView get(@PathVariable Long id) {
        return service.get(id);
    }

    @PutMapping({"/department", "/department/{id}"})
    public void upsert(
        @PathVariable(required = false) Long id,
        @Valid @RequestBody DepartmentParameter parameter
    ) {
        service.upsert(id, parameter);
    }

    @PostMapping("/department/tree")
    public void changeTree(@Valid @RequestBody DepartmentChangeTreeParameter parameter) {
        service.changeTree(parameter);
    }

    @DeleteMapping("/department/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
