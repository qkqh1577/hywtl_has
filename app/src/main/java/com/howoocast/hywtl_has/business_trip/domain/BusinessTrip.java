package com.howoocast.hywtl_has.business_trip.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Getter
@Entity
@Table(name = BusinessTrip.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BusinessTrip extends CustomEntity {
    public static final String KEY = "business_trip";

    /**
     * 문서 번호
     */
    private String tripNumber;

    /**
     * 보고자
     */
    private String reporter;

    /**
     * 보고 일시
     */
    private LocalDateTime reportDate;

    /**
     * 부서장
     */
    private String approver1;

    /**
     * 팀장
     */
    private String approver2;

    /**
     * 본부장
     */
    private String approver3;

    /**
     * 소속 조직
     */
    @ManyToOne
    private Department department;

    /**
     * 출장 시작 일시
     */
    private LocalDateTime tripDateFrom;

    /**
     * 출장 시작 종료
     */
    private LocalDateTime tripDateTo;

    /**
     * 프로젝트
     */
    @ManyToOne
    private Project project;

    /**
     * 출장 장소
     */
    private String location;

    /**
     * 출장 동행자
     */
    @OneToMany
    private List<User> accompany;

    /**
     * 출장 목적
     */
    @Column(nullable = false)
    private String purpose;

    /**
     * 상담자 정보
     */
    @Embedded
    private BusinessTripCounterpart counterpart;

    /**
     * 주요 내용 및 업무 진행 사항
     */
    @Column(columnDefinition = "TEXT")
    private String contents;

    /**
     * 기타 참고 사항
     */
    @Column(columnDefinition = "TEXT")
    private String etc;

    /**
     * 추후 진행 사항
     */
    @Column(columnDefinition = "TEXT")
    private String followUp;

    /**
     * 출장비 내역
     */
    @Embedded
    private BusinessTripExpanse expanse;


    public static BusinessTrip of(
            String tripNumber, String reporter, LocalDateTime reportDate,
            String approver1, String approver2, String approver3,
            Department department,
            LocalDateTime tripDateFrom, LocalDateTime tripDateTo,
            Project project,
            String location,
            List<User> accompany,
            String purpose,
            BusinessTripCounterpart counterpart,
            String contents, String etc, String followUp,
            BusinessTripExpanse expanse
    ) {

        BusinessTrip businessTrip = new BusinessTrip();
        businessTrip.tripNumber = tripNumber;
        businessTrip.reporter = reporter;
        businessTrip.reportDate = reportDate;
        businessTrip.approver1 = approver1;
        businessTrip.approver2 = approver2;
        businessTrip.approver3 = approver3;
        businessTrip.department = department;
        businessTrip.tripDateFrom = tripDateFrom;
        businessTrip.tripDateTo = tripDateTo;
        businessTrip.project = project;
        businessTrip.location = location;
        businessTrip.accompany = accompany;
        businessTrip.purpose = purpose;
        businessTrip.counterpart = counterpart;
        businessTrip.contents = contents;
        businessTrip.etc = etc;
        businessTrip.followUp = followUp;
        businessTrip.expanse = expanse;

        return businessTrip;
    }
}
