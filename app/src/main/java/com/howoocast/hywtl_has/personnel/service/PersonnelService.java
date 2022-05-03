package com.howoocast.hywtl_has.personnel.service;

import com.howoocast.hywtl_has.common.service.FileItemService;
import com.howoocast.hywtl_has.common.util.ListConvertor;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.personnel.domain.Personnel;
import com.howoocast.hywtl_has.personnel.parameter.PersonnelParameter;
import com.howoocast.hywtl_has.personnel.repository.PersonnelRepository;
import com.howoocast.hywtl_has.personnel.view.PersonnelListView;
import com.howoocast.hywtl_has.personnel.view.PersonnelView;
import com.howoocast.hywtl_has.user.domain.User;
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

    private final PersonnelRepository personnelRepository;

    private final DepartmentRepository departmentRepository;

    private final FileItemService fileItemService;

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<PersonnelListView> page(
        Predicate predicate,
        Pageable pageable
    ) {
        return personnelRepository.findAll(predicate, pageable)
            .map(PersonnelListView::assemble);
    }

    @Transactional(readOnly = true)
    public PersonnelView get(Long id) {
        return PersonnelView.assemble(Personnel.load(personnelRepository, id));
    }

    @Transactional
    public void update(Long id, PersonnelParameter params) {
        Personnel personnel = Personnel.find(personnelRepository, User.load(userRepository, id));
        personnel.change(
            params.getBasic().imageItem(fileItemService.build(params.getBasic().getImage())).build(),
            params.getCompany().build(),
            ListConvertor.make(params.getJobList().stream()
                .peek(item -> item.setDepartment(
                    Department.load(departmentRepository, item.getDepartmentId()))
                )
                .collect(Collectors.toList())
            ),
            ListConvertor.make(params.getAcademicList()),
            ListConvertor.make(params.getCareerList()),
            ListConvertor.make(params.getLicenseList()),
            ListConvertor.make(params.getLanguageList())
        );
    }

}
