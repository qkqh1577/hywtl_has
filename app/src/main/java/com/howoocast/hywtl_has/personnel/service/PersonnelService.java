package com.howoocast.hywtl_has.personnel.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.FileItemService;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.personnel.domain.Personnel;
import com.howoocast.hywtl_has.personnel.domain.PersonnelBasic;
import com.howoocast.hywtl_has.personnel.domain.PersonnelCompany;
import com.howoocast.hywtl_has.personnel.domain.PersonnelJob;
import com.howoocast.hywtl_has.personnel.parameter.PersonnelCompanyParameter;
import com.howoocast.hywtl_has.personnel.parameter.PersonnelParameter;
import com.howoocast.hywtl_has.personnel.parameter.PersonnelBasicParameter;
import com.howoocast.hywtl_has.personnel.repository.PersonnelRepository;
import com.howoocast.hywtl_has.personnel.view.PersonnelView;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public PersonnelView get(Long id) {
        return PersonnelView.assemble(this.load(id));
    }

    @Transactional
    public PersonnelView update(Long id, PersonnelParameter params) {

        if (!userRepository.existsById(id)) {
            throw new NotFoundException();
        }

        PersonnelBasicParameter basicParams = params.getBasic();
        PersonnelBasic basic = PersonnelBasic.of(
            basicParams.getEngName(),
            basicParams.getBirthDate(),
            basicParams.getSex(),
            fileItemService.build(basicParams.getImage()),
            basicParams.getAddress(),
            basicParams.getPhone(),
            basicParams.getEmergencyPhone(),
            basicParams.getRelationship(),
            basicParams.getPersonalEmail()
        );

        PersonnelCompanyParameter companyParams = params.getCompany();
        PersonnelCompany company = PersonnelCompany.of(
            companyParams.getHiredDate(),
            companyParams.getHiredType(),
            companyParams.getRecommender(),
            companyParams.getJobList().stream()
                .map(jobParams -> PersonnelJob.of(
                    departmentRepository.findByIdAndDeletedTimeIsNull(jobParams.getDepartmentId())
                        .orElseThrow(NotFoundException::new),
                    jobParams.getJobTitle(),
                    jobParams.getJobType(),
                    jobParams.getJobPosition(),
                    jobParams.getJobClass(),
                    jobParams.getJobDuty()
                ))
                .collect(Collectors.toList())
        );

        Personnel personnel = Personnel.of(
            personnelRepository,
            id,
            basic,
            company
        );
        return PersonnelView.assemble(personnelRepository.save(personnel));
    }

    private Personnel load(Long id) {
        return personnelRepository.findById(id).orElseThrow(NotFoundException::new);
    }
}
