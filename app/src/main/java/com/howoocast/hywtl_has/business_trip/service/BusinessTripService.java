package com.howoocast.hywtl_has.business_trip.service;

import com.howoocast.hywtl_has.business_trip.domain.BusinessTrip;
import com.howoocast.hywtl_has.business_trip.domain.BusinessTripCounterpart;
import com.howoocast.hywtl_has.business_trip.domain.BusinessTripExpanse;
import com.howoocast.hywtl_has.business_trip.parameter.BusinessTripParameter;
import com.howoocast.hywtl_has.business_trip.repository.BusinessTripRepository;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BusinessTripService {

    private final BusinessTripRepository businessTripRepository;
    private final DepartmentRepository departmentRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Transactional
    public void add(BusinessTripParameter parameter) {
        BusinessTrip businessTrip = getBusinessTrip(parameter);
        businessTripRepository.save(businessTrip);
    }

    @Transactional
    public void change(Long tripId, BusinessTripParameter parameter) {
        BusinessTrip businessTrip = get(tripId);

        businessTrip.change(
                parameter.getTripNumber(),
                parameter.getReporter(),
                parameter.getReportDate(),
                parameter.getApprover1(),
                parameter.getApprover2(),
                parameter.getApprover3(),
                getDepartmentById(parameter.getDepartmentId()),
                parameter.getTripDateFrom(),
                parameter.getTripDateTo(),
                getProjectById(parameter.getProjectId()),
                parameter.getLocation(),
                getUsersByIds(parameter.getAccompanyIds()),
                parameter.getPurpose(),
                BusinessTripCounterpart.of(
                        parameter.getCounterpart().getCompanyName(),
                        parameter.getCounterpart().getDepartment(),
                        parameter.getCounterpart().getRank(),
                        parameter.getCounterpart().getName()
                ),
                parameter.getContents(),
                parameter.getEtc(),
                parameter.getFollowUp(),
                BusinessTripExpanse.of(
                        parameter.getExpanse().getDistance(),
                        parameter.getExpanse().getDistanceComment(),
                        parameter.getExpanse().getAccommodationFee(),
                        parameter.getExpanse().getAccommodationFeeComment(),
                        parameter.getExpanse().getTransportationFee(),
                        parameter.getExpanse().getTransportationFeeComment(),
                        parameter.getExpanse().getExtraFee(),
                        parameter.getExpanse().getExtraFeeComment()
                )
        );

    }

    @Transactional
    public void remove(Long tripId){
        get(tripId).delete();
    }

    @Transactional(readOnly = true)
    public List<BusinessTrip> list() {
        return businessTripRepository.findAllByOrderByIdDesc();
    }

    @Transactional(readOnly = true)
    public BusinessTrip get(Long tripId) {
        return businessTripRepository.findById(tripId).orElseThrow(() -> {
            throw new NotFoundException(
                    BusinessTrip.KEY,
                    tripId.toString()
            );
        });
    }

    private BusinessTrip getBusinessTrip(BusinessTripParameter parameter) {
        BusinessTrip businessTrip = BusinessTrip.of(
                parameter.getTripNumber(),
                parameter.getReporter(),
                parameter.getReportDate(),
                parameter.getApprover1(),
                parameter.getApprover2(),
                parameter.getApprover3(),
                getDepartmentById(parameter.getDepartmentId()),
                parameter.getTripDateFrom(),
                parameter.getTripDateTo(),
                getProjectById(parameter.getProjectId()),
                parameter.getLocation(),
                getUsersByIds(parameter.getAccompanyIds()),
                parameter.getPurpose(),
                BusinessTripCounterpart.of(
                        parameter.getCounterpart()==null? null : parameter.getCounterpart().getCompanyName(),
                        parameter.getCounterpart()==null? null : parameter.getCounterpart().getDepartment(),
                        parameter.getCounterpart()==null? null : parameter.getCounterpart().getRank(),
                        parameter.getCounterpart()==null? null : parameter.getCounterpart().getName()
                ),
                parameter.getContents(),
                parameter.getEtc(),
                parameter.getFollowUp(),
                BusinessTripExpanse.of(
                        parameter.getExpanse()==null? null : parameter.getExpanse().getDistance(),
                        parameter.getExpanse()==null? null : parameter.getExpanse().getDistanceComment(),
                        parameter.getExpanse()==null? null : parameter.getExpanse().getAccommodationFee(),
                        parameter.getExpanse()==null? null : parameter.getExpanse().getAccommodationFeeComment(),
                        parameter.getExpanse()==null? null : parameter.getExpanse().getTransportationFee(),
                        parameter.getExpanse()==null? null : parameter.getExpanse().getTransportationFeeComment(),
                        parameter.getExpanse()==null? null : parameter.getExpanse().getExtraFee(),
                        parameter.getExpanse()==null? null : parameter.getExpanse().getExtraFeeComment()
                )
        );
        return businessTrip;
    }

    private Project getProjectById(Long pjtId) {
        return projectRepository.findById(pjtId)
                .orElseThrow(() -> new NotFoundException(Project.KEY, pjtId));
    }

    private Department getDepartmentById(Long deptId) {
        return departmentRepository.findById(deptId)
                .orElseThrow(() -> new NotFoundException(Department.KEY, deptId));
    }

    private List<User> getUsersByIds(List<Long> userIds) {
        ArrayList<User> users = new ArrayList<>();
        if (userIds == null) return users;
        userIds.forEach(userId -> {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> {
                        throw new NotFoundException(
                                User.KEY,
                                userId.toString());
                    });
            users.add(user);
        });
        return users;
    }

}
