package com.howoocast.hywtl_has.personnel.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.FileItemService;
import com.howoocast.hywtl_has.personnel.parameter.PersonnelAddParameter;
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

    @Transactional
    public PersonnelView add(PersonnelAddParameter params) {
        return PersonnelView.assemble(
            params.assemble(
                personnelRepository,
                userRepository.findById(params.getUserId()).orElseThrow(NotFoundException::new),
                fileItemService.add(params.getBasic().getImageFile())
            )
        );
    }
}
