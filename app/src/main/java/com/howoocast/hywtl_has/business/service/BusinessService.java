package com.howoocast.hywtl_has.business.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.business.parameter.BusinessParameter;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.business.view.BusinessListView;
import com.howoocast.hywtl_has.business.view.BusinessView;
import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.querydsl.core.types.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class BusinessService {

    private final BusinessRepository repository;

    @Transactional(readOnly = true)
    public Page<BusinessListView> page(@Nullable Predicate predicate, Pageable pageable) {
        return Optional.ofNullable(predicate)
            .map(p -> repository.findAll(p, pageable))
            .orElse(repository.findAll(pageable))
            .map(BusinessListView::assemble);
    }

    @Transactional(readOnly = true)
    public List<BusinessView> getList(@Nullable Predicate predicate) {
        Pageable pageable = Pageable.ofSize(Integer.MAX_VALUE);
        return Optional.ofNullable(predicate)
            .map(p -> repository.findAll(p, pageable))
            .orElse(repository.findAll(pageable))
            .map(BusinessView::assemble)
            .getContent();
    }

    @Transactional(readOnly = true)
    public BusinessView get(Long id) {
        return BusinessView.assemble(this.load(id));
    }

    @Transactional
    public BusinessView add(BusinessParameter params) {
        repository.findByRegistrationNumber(params.getRegistrationNumber()).ifPresent((instance) -> {
            throw new DuplicatedValueException("registrationNumber", params.getRegistrationNumber());
        });

        // NOTE: 아래와 동일 로직
//        List<BusinessManager> managerList = new ArrayList<>();
//        if (params.getManagerList() != null) {
//            List<BusinessManagerParameter> list = params.getManagerList();
//
//            for (int i = 0; i < list.size(); i++) {
//                BusinessManagerParameter item = list.get(i);
//                BusinessManager manager = BusinessManager.of(
//                    item.getName(),
//                    item.getJobTitle(),
//                    item.getMobilePhone(),
//                    item.getOfficePhone(),
//                    item.getEmail(),
//                    item.getMeta(),
//                    item.getStatus()
//                );
//                managerList.add(manager);
//            }
//        }

        List<BusinessManager> managerList = Optional.ofNullable(params.getManagerList())
            .map(list -> list.stream()
                .map(manager -> BusinessManager.of(
                    manager.getName(),
                    manager.getJobTitle(),
                    manager.getMobilePhone(),
                    manager.getOfficePhone(),
                    manager.getEmail(),
                    manager.getMeta(),
                    manager.getStatus()))
                .collect(Collectors.toList())
            ).orElse(Collections.emptyList());

        Business business = Business.of(
            params.getName(),
            params.getRepresentativeName(),
            params.getRegistrationNumber(),
            params.getAddress(),
            params.getZipCode(),
            params.getOfficePhone(),
            params.getMemo(),
            managerList
        );

        return BusinessView.assemble(repository.save(business));
    }

    @Transactional
    public void change(Long id, BusinessParameter params) {
        repository.findByRegistrationNumber(params.getRegistrationNumber()).ifPresent(instance -> {
            if (!instance.getId().equals(id)) {
                throw new DuplicatedValueException("registrationNumber", params.getRegistrationNumber());
            }
        });

        Business business = this.load(id);

//        List<BusinessManager> managerList = new ArrayList<>();
//
//        if (params.getManagerList() != null) {
//
//            List<BusinessManagerParameter> managerParameterList = params.getManagerList();
//
//            for (int i = 0; i < managerParameterList.size(); i++) {
//
//                BusinessManagerParameter managerParameter = managerParameterList.get(i);
//
//                if (managerParameter.getId() != null) {
//                    boolean found = false;
//                    List<BusinessManager> prevManagerList = business.getManagerList();
//
//                    for (int j = 0; j < prevManagerList.size(); j++) {
//
//                        if (prevManagerList.get(j).getId().equals(managerParameter.getId())) {
//                            found = true;
//                            BusinessManager manager = prevManagerList.get(j);
//                            manager.change(
//                                managerParameter.getName(),
//                                managerParameter.getJobTitle(),
//                                managerParameter.getMobilePhone(),
//                                managerParameter.getOfficePhone(),
//                                managerParameter.getEmail(),
//                                managerParameter.getMeta(),
//                                managerParameter.getStatus()
//                            );
//                            managerList.add(manager);
//                            break;
//                        }
//                    } // end of prevManagerList loop
//
//                    if (!found) {
//                        throw new NotFoundException("business-manager", managerParameter.getId());
//                    }
//                }
//                else {
//                    BusinessManager manager = BusinessManager.of(
//                        managerParameter.getName(),
//                        managerParameter.getJobTitle(),
//                        managerParameter.getMobilePhone(),
//                        managerParameter.getOfficePhone(),
//                        managerParameter.getEmail(),
//                        managerParameter.getMeta(),
//                        managerParameter.getStatus()
//                    );
//                    managerList.add(manager);
//                }
//            }
//        }

        List<BusinessManager> managerList = Optional.ofNullable(params.getManagerList())
            .map(managerParameterList -> managerParameterList.stream()
                .map(managerParameter -> {
                    if (Objects.isNull(managerParameter.getId())) {
                        return BusinessManager.of(
                            managerParameter.getName(),
                            managerParameter.getJobTitle(),
                            managerParameter.getMobilePhone(),
                            managerParameter.getOfficePhone(),
                            managerParameter.getEmail(),
                            managerParameter.getMeta(),
                            managerParameter.getStatus()
                        );
                    }
                    BusinessManager manager = business.getManagerList().stream()
                        .filter(item -> item.getId().equals(managerParameter.getId()))
                        .findFirst()
                        .orElseThrow(() -> new NotFoundException("business-manager", managerParameter.getId()));
                    manager.change(
                        managerParameter.getName(),
                        managerParameter.getJobTitle(),
                        managerParameter.getMobilePhone(),
                        managerParameter.getOfficePhone(),
                        managerParameter.getEmail(),
                        managerParameter.getMeta(),
                        managerParameter.getStatus()
                    );
                    return manager;
                })
                .collect(Collectors.toList())
            ).orElse(Collections.emptyList());

        business.change(
            params.getName(),
            params.getRepresentativeName(),
            params.getRegistrationNumber(),
            params.getAddress(),
            params.getZipCode(),
            params.getOfficePhone(),
            params.getMemo(),
            managerList
        );
    }

    @Transactional
    public void delete(Long id) {
        repository.findById(id).ifPresent(instance -> {
            if (!instance.getManagerList().isEmpty()) {
                // TODO: 삭제 불가한 경우 던질 예외 파일 만들기
//                throw new SomethingAwesomeException();
            }
            repository.deleteById(instance.getId());
        });
    }

    private Business load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("business", id));
    }
}


