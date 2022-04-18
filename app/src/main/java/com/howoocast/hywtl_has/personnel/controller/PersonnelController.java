package com.howoocast.hywtl_has.personnel.controller;

import com.howoocast.hywtl_has.personnel.parameter.PersonnelAddParameter;
import com.howoocast.hywtl_has.personnel.service.PersonnelService;
import com.howoocast.hywtl_has.personnel.view.PersonnelView;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class PersonnelController {

    private final PersonnelService personnelService;

    @PostMapping("/personnels")
    public PersonnelView add(@Valid @ModelAttribute PersonnelAddParameter params) {
        return personnelService.add(params);
    }
}
