package com.howoocast.hywtl_has.project.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.howoocast.hywtl_has.project.repository.ProjectOrderRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectOrder {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter(AccessLevel.NONE)
    @JsonIgnore
    @OneToOne(mappedBy = "order")
    private Project project;

    private Long amount; // 총 수주 금액

    private LocalDate receivedDate; // 수주일

    private LocalDate beginDate; // 착수일

    private LocalDate closeDate; // 마감일

    private Boolean isOnGoing; // 수주 적용 여부

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime updatedTime;

    @Getter(AccessLevel.NONE)
    @Column(insertable = false)
    private LocalDateTime deletedTime;

    @Getter(AccessLevel.NONE)
    @JsonIgnore
    @Transient
    private ProjectOrderRepository repository;

    //////////////////////////////////
    //// constructor
    //////////////////////////////////

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static ProjectOrder of(
        ProjectOrderRepository repository,
        Long amount,
        LocalDate receivedDate,
        LocalDate beginDate,
        LocalDate closeDate,
        Boolean isOnGoing
    ) {
        ProjectOrder instance = new ProjectOrder();
        instance.amount = amount;
        instance.receivedDate = receivedDate;
        instance.beginDate = beginDate;
        instance.closeDate = closeDate;
        instance.isOnGoing = isOnGoing;
        instance.createdTime = LocalDateTime.now();
        instance.updatedTime = instance.createdTime;
        instance.repository = repository;
        instance.save();
        return instance;
    }

    //////////////////////////////////
    //// finder
    //////////////////////////////////
    @Nullable
    public static ProjectOrder find(ProjectOrderRepository repository, Long projectId) {
        ProjectOrder instance = repository.findByProject_IdAndDeletedTimeIsNull(projectId).orElse(null);
        if (Objects.isNull(instance)) {
            return null;
        }
        instance.repository = repository;
        return instance;
    }

    //////////////////////////////////
    //// checker
    //////////////////////////////////

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    public void change(
        Long amount,
        LocalDate receivedDate,
        LocalDate beginDate,
        LocalDate closeDate,
        Boolean isOnGoing
    ) {
        this.amount = amount;
        this.receivedDate = receivedDate;
        this.beginDate = beginDate;
        this.closeDate = closeDate;
        this.isOnGoing = isOnGoing;
        this.updatedTime = LocalDateTime.now();
        this.save();
    }

    private void save() {
        repository.save(this);
    }
}
