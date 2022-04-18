package com.howoocast.hywtl_has.personnel.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.FileItemService;
import com.howoocast.hywtl_has.personnel.domain.Personnel;
import com.howoocast.hywtl_has.personnel.domain.PersonnelBasic;
import com.howoocast.hywtl_has.personnel.parameter.PersonnelAddParameter;
import com.howoocast.hywtl_has.personnel.parameter.PersonnelAddParameter.PersonnelBasicAddParameter;
import com.howoocast.hywtl_has.personnel.repository.PersonnelRepository;
import com.howoocast.hywtl_has.personnel.view.PersonnelView;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PersonnelService {

    private final PersonnelRepository personnelRepository;

    private final FileItemService fileItemService;

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public PersonnelView get(Long id) {
        return PersonnelView.assemble(this.load(id));
    }

    @Transactional
    public PersonnelView add(PersonnelAddParameter params) {
        PersonnelBasicAddParameter basicParams = params.getBasic();
        PersonnelBasic basic = PersonnelBasic.of(
            basicParams.getEngName(),
            basicParams.getBirthDate(),
            basicParams.getSex(),
            fileItemService.build(basicParams.getImageFile()),
            basicParams.getAddress(),
            basicParams.getPhone(),
            basicParams.getEmergencyPhone(),
            basicParams.getRelationship(),
            basicParams.getPersonalEmail()
        );

        Personnel personnel = Personnel.of(
            personnelRepository,
            userRepository.findById(params.getUserId()).orElseThrow(NotFoundException::new),
            basic
        );

        return PersonnelView.assemble(personnelRepository.save(personnel));
    }

    private Personnel load(Long id) {
        return personnelRepository.findById(id).orElseThrow(NotFoundException::new);
    }
}
