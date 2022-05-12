package com.howoocast.hywtl_has.project.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.common.ProjectStatus;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDate;
import java.util.Objects;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Slf4j
@Getter
@Entity
@Table(name = "project")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update project set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Project extends CustomEntity {

    @NotNull
    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "code", column = @Column(name = "basic__code")),
        @AttributeOverride(name = "name", column = @Column(name = "basic__name")),
        @AttributeOverride(name = "alias", column = @Column(name = "basic__alias")),
        @AttributeOverride(name = "status", column = @Column(name = "basic__status")),
        @AttributeOverride(name = "address", column = @Column(name = "basic__address")),
        @AttributeOverride(name = "purpose1", column = @Column(name = "basic__purpose1")),
        @AttributeOverride(name = "purpose2", column = @Column(name = "basic__purpose2")),
        @AttributeOverride(name = "lotArea", column = @Column(name = "basic__lot_area")),
        @AttributeOverride(name = "totalArea", column = @Column(name = "basic__total_area")),
        @AttributeOverride(name = "buildingCount", column = @Column(name = "basic__building_count")),
        @AttributeOverride(name = "householdCount", column = @Column(name = "basic__household_count")),
        @AttributeOverride(name = "floorCount", column = @Column(name = "basic__floor_count")),
        @AttributeOverride(name = "baseCount", column = @Column(name = "basic__base_count")),
        @AttributeOverride(name = "clientName", column = @Column(name = "basic__client_name")),
        @AttributeOverride(name = "isClientLH", column = @Column(name = "basic__is_client_lh")),
        @AttributeOverride(name = "clientManager", column = @Column(name = "basic__client_manager")),
        @AttributeOverride(name = "clientPhone", column = @Column(name = "basic__client_phone")),
        @AttributeOverride(name = "clientEmail", column = @Column(name = "basic__client_email")),
        @AttributeOverride(name = "modifiedAt", column = @Column(name = "basic__modified_at"))
    })
    private ProjectBasic basic;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "amount", column = @Column(name = "order__amount")),
        @AttributeOverride(name = "receivedDate", column = @Column(name = "order__received_date")),
        @AttributeOverride(name = "beginDate", column = @Column(name = "order__begin_date")),
        @AttributeOverride(name = "closeDate", column = @Column(name = "order__close_date")),
        @AttributeOverride(name = "isOnGoing", column = @Column(name = "order__is_on_going")),
        @AttributeOverride(name = "modifiedAt", column = @Column(name = "order__modified_at"))
    })
    private ProjectOrder order;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "landModelCount", column = @Column(name = "target__land_model_count")),
        @AttributeOverride(name = "modifiedAt", column = @Column(name = "target__modified_at"))
    })
    private ProjectTarget target;

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static Project of(
        String name,
        String code,
        String alias,
        User salesManager,
        User projectManager
    ) {
        Project instance = new Project();
        instance.basic = ProjectBasic.of(
            name,
            code,
            alias,
            salesManager,
            projectManager
        );
        return instance;
    }

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    public void changeStatus(ProjectStatus status) {
        this.basic.change(status);
    }

    public void changeBasic(
        String name,
        String code,
        String alias,
        User salesManager,
        User projectManager,
        String address,
        String purpose1,
        String purpose2,
        Double lotArea,
        Double totalArea,
        Integer buildingCount,
        Integer householdCount,
        Integer floorCount,
        Integer baseCount,
        String clientName,
        Boolean isClientLH,
        String clientManager,
        String clientPhone,
        String clientEmail) {
        this.basic.change(
            name,
            code,
            alias,
            salesManager,
            projectManager,
            address,
            purpose1,
            purpose2,
            lotArea,
            totalArea,
            buildingCount,
            householdCount,
            floorCount,
            baseCount,
            clientName,
            isClientLH,
            clientManager,
            clientPhone,
            clientEmail
        );
    }

    public void changeOrder(
        Long amount,
        LocalDate receivedDate,
        LocalDate beginDate,
        LocalDate closeDate,
        Boolean isOnGoing
    ) {
        if (Objects.isNull(this.order)) {
            this.order = new ProjectOrder();
        }
        this.order.change(
            amount,
            receivedDate,
            beginDate,
            closeDate,
            isOnGoing
        );
    }

    public void changeTarget(
        Integer landModelCount
    ) {
        if (Objects.isNull(this.target)) {
            this.target = new ProjectTarget();
        }
        this.target.change(
            landModelCount
        );
    }
}
