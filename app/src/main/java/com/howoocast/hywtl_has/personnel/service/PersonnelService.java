package com.howoocast.hywtl_has.personnel.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.file.service.FileItemService;
import com.howoocast.hywtl_has.common.util.ListConvertor;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.personnel.domain.Personnel;
import com.howoocast.hywtl_has.personnel.parameter.PersonnelParameter;
import com.howoocast.hywtl_has.personnel.repository.PersonnelRepository;
import com.howoocast.hywtl_has.personnel.view.PersonnelShortView;
import com.howoocast.hywtl_has.personnel.view.PersonnelView;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.querydsl.core.types.Predicate;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PersonnelService {

    private final PersonnelRepository repository;

    private final DepartmentRepository departmentRepository;

    private final FileItemService fileItemService;

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<PersonnelShortView> page(
        Predicate predicate,
        Pageable pageable
    ) {
        return repository.findAll(predicate, pageable)
            .map(PersonnelShortView::assemble);
    }

    @Transactional(readOnly = true)
    public PersonnelView get(Long id) {
        Personnel instance = this.load(id);
        return PersonnelView.assemble(instance);
    }

    @Transactional
    public void update(Long id, PersonnelParameter parameter) {
        Personnel personnel = this.find(id);
        personnel.change(
            parameter.getBasic().imageItem(fileItemService.build(parameter.getBasic().getImage())).build(),
            parameter.getCompany().build(),
            ListConvertor.make(parameter.getJobList().stream()
                .peek(item -> item.setDepartment(
                    departmentRepository.findById(item.getDepartmentId())
                        .orElseThrow(() -> new NotFoundException("department", item.getDepartmentId())))
                )
                .collect(Collectors.toList())
            ),
            ListConvertor.make(parameter.getAcademicList()),
            ListConvertor.make(parameter.getCareerList()),
            ListConvertor.make(parameter.getLicenseList()),
            ListConvertor.make(parameter.getLanguageList())
        );
    }

    private Personnel load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("personnel", id));
    }

    private Personnel find(Long id) {
        return repository
            .findById(id)
            .orElse(
                Personnel.of(
                    userRepository.findById(id)
                        .orElseThrow(() -> new NotFoundException("user", id))
                )
            );
    }
}
