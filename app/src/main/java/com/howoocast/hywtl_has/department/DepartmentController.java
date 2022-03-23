package com.howoocast.hywtl_has.department;

import com.howoocast.hywtl_has.department.parameter.DepartmentAddParameter;
import com.howoocast.hywtl_has.department.service.DepartmentService;
import com.howoocast.hywtl_has.department.view.DepartmentView;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping("/departments")
    public Page<DepartmentView> page(Pageable pageable) {
        return departmentService.page(pageable);
    }

    @GetMapping("/departments/{id}")
    public DepartmentView get(@PathVariable Long id) {
        return departmentService.get(id);
    }

    @PostMapping("/departments")
    public DepartmentView add(@Valid @RequestBody DepartmentAddParameter params) {
        return departmentService.add(params);
    }
}
