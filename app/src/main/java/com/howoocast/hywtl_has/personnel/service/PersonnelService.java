package com.howoocast.hywtl_has.personnel.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.common.util.ListConvertor;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.file.service.FileItemService;
import com.howoocast.hywtl_has.personnel.domain.Personnel;
import com.howoocast.hywtl_has.personnel.domain.PersonnelBasic;
import com.howoocast.hywtl_has.personnel.domain.PersonnelCompany;
import com.howoocast.hywtl_has.personnel.domain.PersonnelJob;
import com.howoocast.hywtl_has.personnel.parameter.PersonnelParameter;
import com.howoocast.hywtl_has.personnel.repository.PersonnelRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.querydsl.core.types.Predicate;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Slf4j
@Service
@RequiredArgsConstructor
public class PersonnelService {

    private final PersonnelRepository repository;

    private final DepartmentRepository departmentRepository;

    private final FileItemService fileItemService;

    @Transactional(readOnly = true)
    public Page<Personnel> page(
        Predicate predicate,
        Pageable pageable
    ) {
        return repository.findAll(predicate, pageable);
    }

    @Transactional(readOnly = true)
    public Personnel get(Long id) {
        return this.load(id);
    }

    @Transactional(readOnly = true)
    public Personnel getByUserId(Long userId) {
        return repository.findByUser_Id(userId)
            .orElseThrow(() -> {
                throw new NotFoundException(User.KEY, userId);
            });
    }

    @Transactional
    public void change(
        Long id,
        PersonnelParameter parameter) {
        Personnel instance = this.load(id);
        instance.change(
            PersonnelBasic.of(
                parameter.getBasic().getEngName(),
                parameter.getBasic().getBirthDate(),
                parameter.getBasic().getSex(),
                fileItemService.build(parameter.getBasic().getImage()),
                parameter.getBasic().getAddress(),
                parameter.getBasic().getPhone(),
                parameter.getBasic().getEmergencyPhone(),
                parameter.getBasic().getRelationship(),
                parameter.getBasic().getPersonalEmail()
            ),
            PersonnelCompany.of(
                parameter.getCompany().getHiredDate(),
                parameter.getCompany().getHiredType(),
                parameter.getCompany().getRecommender()
            ),
            parameter.getJobList().stream()
                .map(item -> PersonnelJob.of(
                    new CustomFinder<>(departmentRepository, Department.class).byId(item.getDepartmentId()),
                    item.getJobTitle(),
                    item.getJobType(),
                    item.getJobPosition(),
                    item.getJobClass(),
                    item.getJobDuty(),
                    item.getIsRepresentative()
                ))
                .collect(Collectors.toList()),
            ListConvertor.make(parameter.getAcademicList()),
            ListConvertor.make(parameter.getCareerList()),
            ListConvertor.make(parameter.getLicenseList()),
            ListConvertor.make(parameter.getLanguageList())
        );
        if (Objects.isNull(instance.getId())) {
            repository.save(instance);
        }
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT, classes = User.class)
    public void add(User event) {
        repository.save(Personnel.of(event));
    }

    private Personnel load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException(Personnel.KEY, id));
    }

}
