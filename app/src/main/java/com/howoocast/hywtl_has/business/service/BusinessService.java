package com.howoocast.hywtl_has.business.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.business.parameter.BusinessManagerParameter;
import com.howoocast.hywtl_has.business.parameter.BusinessParameter;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.project.view.ProjectShortView;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicBusinessRepository;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicExternalContributorRepository;
import com.howoocast.hywtl_has.project_contract.repository.ProjectFinalContractRepository;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectEstimateRepository;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectFinalEstimateRepository;
import com.howoocast.hywtl_has.rival_bid.repository.RivalBidRepository;
import com.howoocast.hywtl_has.rival_estimate.repository.RivalEstimateRepository;
import com.querydsl.core.types.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class BusinessService {

    private final BusinessRepository repository;

    private final ProjectBasicBusinessRepository projectBasicBusinessRepository;

    private final RivalBidRepository rivalBidRepository;

    private final RivalEstimateRepository rivalEstimateRepository;

    private final ProjectFinalEstimateRepository projectFinalEstimateRepository;

    private final ProjectFinalContractRepository projectFinalContractRepository;

    private final ProjectEstimateRepository projectEstimateRepository;

    private final ProjectBasicExternalContributorRepository projectBasicExternalContributorRepository;

    @Transactional(readOnly = true)
    @Cacheable(value = "businessServiceCache")
    public Page<Business> findAll(@Nullable Predicate predicate, Pageable pageable) {
        return Optional.ofNullable(predicate)
            .map(p -> repository.findAll(p, pageable))
            .orElse(repository.findAll(pageable));
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "businessServiceCache")
    public List<Business> findAll(@Nullable Predicate predicate) {
        Pageable pageable = Pageable.ofSize(Integer.MAX_VALUE);
        return Optional.ofNullable(predicate)
            .map(p -> repository.findAll(p, pageable))
            .orElse(repository.findAll(pageable))
            .getContent();
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "businessServiceCache")
    public List<Business> findByRegistrationNumber(String registrationNumber) {
        return repository.findByRegistrationNumber(registrationNumber);
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "businessServiceCache")
    public Business get(Long id) {
        return this.load(id);
    }

    @Transactional
    @CacheEvict(value = "businessServiceCache", allEntries = true)
    public void upsert(@Nullable Long pathId, BusinessParameter parameter) {
        Long id = Objects.isNull(pathId) ? parameter.getId() : pathId;

        this.checkRegistrationNumber(parameter.getRegistrationNumber(), id);

        if (Objects.isNull(id)) {
            this.add(parameter);
        } else {
            this.change(id, parameter);
        }
    }

    private void add(BusinessParameter parameter) {
        List<BusinessManager> managerList = new ArrayList<>();
        if (Objects.nonNull(parameter.getManagerList())) {
            managerList = parameter.getManagerList().stream()
                .map(this::ofDomain)
                .collect(Collectors.toList());
        }

        Business business = Business.of(
            parameter.getName(),
            parameter.getCeoName(),
            parameter.getRegistrationNumber(),
            parameter.getAddress(),
            parameter.getZipCode(),
            parameter.getOfficePhone(),
            parameter.getNote(),
            parameter.getFax(),
            managerList
        );

        repository.save(business);
    }

    private void change(Long id, BusinessParameter parameter) {

        Business instance = this.load(id);

        List<BusinessManager> managerList = new ArrayList<>();
        List<BusinessManagerParameter> managerParameterList = new ArrayList<>();
        if (Objects.nonNull(parameter.getManagerList())) {
            managerParameterList = parameter.getManagerList();
        }

        for (BusinessManagerParameter managerParameter : managerParameterList) {
            Long managerId = managerParameter.getId();
            if (Objects.isNull(managerId)) {
                // add
                BusinessManager managerInstance = this.ofDomain(managerParameter);
                managerList.add(managerInstance);
            } else {
                // change
                instance.findManagerByManagerId(managerId)
                    .ifPresentOrElse((managerInstance) -> {
                        managerInstance.change(
                            managerParameter.getName(),
                            managerParameter.getJobTitle(),
                            managerParameter.getDepartment(),
                            managerParameter.getMobilePhone(),
                            managerParameter.getOfficePhone(),
                            managerParameter.getEmail(),
                            managerParameter.getMeta(),
                            managerParameter.getStatus(),
                            managerParameter.getAddress()
                        );
                        managerList.add(managerInstance);
                    }, () -> {
                        throw new NotFoundException(BusinessManager.KEY, managerId);
                    });
            }
        }

        instance.getManagerList().stream()
            .filter(prevManager -> managerList.stream()
                .noneMatch(nextManager -> Objects.equals(prevManager.getId(), nextManager.getId()))
            ).forEach(removedManager -> {
                // TODO: removed manager
                exceptionHandlingByBusinessManger(removedManager);
                removedManager.delete();
            });

        instance.change(
            parameter.getName(),
            parameter.getCeoName(),
            parameter.getRegistrationNumber(),
            parameter.getAddress(),
            parameter.getZipCode(),
            parameter.getOfficePhone(),
            parameter.getNote(),
            parameter.getFax(),
            managerList
        );
    }

    @Transactional
    @CacheEvict(value = "businessServiceCache", allEntries = true)
    public void delete(Long id) {
        //TODO: existsBy??? ??????.
        repository.findById(id).ifPresent(instance -> {
            exceptionHandlingByBusiness(id, instance);
            instance.delete();
        });
    }

    @Cacheable(value = "businessServiceCache")
    public List<ProjectShortView> getProjectList(Long id) {
        return projectBasicBusinessRepository.findByBusinessManager_Id(id).stream()
            .map(projectBasicBusiness -> ProjectShortView.assemble(projectBasicBusiness.getProject()))
            .collect(Collectors.toList());
    }

    private void exceptionHandlingByBusiness(Long id, Business instance) {
        if (!instance.getManagerList().isEmpty()) {
            throw new IllegalRequestException(
                Business.KEY + ".manager_list.delete_violation",
                "???????????? ???????????? ????????? ????????? ??? ????????????."
            );
        }

        if (rivalBidRepository.existsByBusiness_Id(id)) {
            throw new IllegalRequestException(
                Business.KEY + ".rival_bid.delete_violation",
                "?????? ?????? ????????? ???????????? ????????? ????????? ??? ????????????."
            );
        }

        if (rivalEstimateRepository.existsByBusiness_Id(id)) {
            throw new IllegalRequestException(
                Business.KEY + ".rival_estimate_bid.delete_violation",
                "?????? ?????? ????????? ???????????? ????????? ????????? ??? ????????????."
            );
        }

        if (projectBasicBusinessRepository.existsByBusiness_Id(id)) {
            throw new IllegalRequestException(
                Business.KEY + ".project_basic_business.delete_violation",
                "???????????? ???????????? ????????? ????????? ????????? ??? ????????????."
            );
        }

        if (projectFinalEstimateRepository.existsByBusiness_Id(id)) {
            throw new IllegalRequestException(
                Business.KEY + ".project_final_estimate.delete_violation",
                "???????????? ?????? ???????????? ?????? ????????? ????????? ????????? ????????? ??? ????????????."
            );
        }

        if (projectFinalContractRepository.existsByBusiness_Id(id)) {
            throw new IllegalRequestException(
                Business.KEY + ".project_final_contract.delete_violation",
                "???????????? ?????? ???????????? ???????????? ????????? ????????? ????????? ??? ????????????."
            );
        }

        if (projectEstimateRepository.existsByBusiness_Id(id)) {
            throw new IllegalRequestException(
                Business.KEY + ".project_estimate.delete_violation",
                "???????????? ???????????? ?????? ????????? ????????? ????????? ????????? ??? ????????????."
            );
        }
    }

    private void exceptionHandlingByBusinessManger(BusinessManager removedManager) {
        if(projectBasicBusinessRepository.existsByBusinessManager_Id(removedManager.getId())){
            throw new IllegalRequestException(
                BusinessManager.KEY,
                "???????????? ?????? ?????? ???????????? ???????????? ????????? ???????????? ????????? ??? ????????????."
            );
        }

        if (projectBasicExternalContributorRepository.existsByBusinessManager_Id(removedManager.getId())) {
            throw new IllegalRequestException(
                BusinessManager.KEY,
                "???????????? ?????? ?????? ?????? ???????????? ????????? ???????????? ????????? ??? ????????????."
            );
        }
    }
    private Business load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException(Business.KEY, id));
    }

    private void checkRegistrationNumber(String registrationNumber, @Nullable Long id) {
        repository.findByRegistrationNumber(registrationNumber)
            .stream()
            .filter(instance -> !Objects.equals(id, instance.getId()))
            .findFirst()
            .ifPresent((instance) -> {
                throw new DuplicatedValueException(Business.KEY, "registration_number", registrationNumber);
            });
    }

    private BusinessManager ofDomain(BusinessManagerParameter parameter) {
        return BusinessManager.of(
            parameter.getName(),
            parameter.getJobTitle(),
            parameter.getDepartment(),
            parameter.getMobilePhone(),
            parameter.getOfficePhone(),
            parameter.getEmail(),
            parameter.getMeta(),
            parameter.getStatus(),
            parameter.getAddress()
        );
    }
}


