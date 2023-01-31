package com.howoocast.hywtl_has.migration.service;

import com.howoocast.hywtl_has.department.domain.DepartmentCategory;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.migration.enums.PersonnelHeader;
import com.howoocast.hywtl_has.migration.loader.PersonnelExcelReader;
import com.howoocast.hywtl_has.personnel.domain.Personnel;
import com.howoocast.hywtl_has.personnel.domain.PersonnelBasic;
import com.howoocast.hywtl_has.personnel.domain.PersonnelCompany;
import com.howoocast.hywtl_has.personnel.domain.PersonnelJob;
import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user_verification.domain.UserInvitation;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Component
@RequiredArgsConstructor
public class UserInitDataService {

    @PersistenceContext
    private EntityManager em;

    private final DepartmentRepository departmentRepository;

    @Transactional
    public void init() {
        // admin 계정
        departmentRepository.findByNameAndCategory("한양풍동실험연구소",
            DepartmentCategory.COMPANY).ifPresent(department -> {
            em.persist(
                UserInvitation.of(
                    "geun@howoocast.com",
                    "관리자",
                    department,
                    UserRole.MASTER
                ));
            em.persist(
                User.of(
                    "admin",
                    "qwe123",
                    "관리자",
                    "geun@howoocast.com",
                    department,
                    UserRole.MASTER
                )
            );

        });

        List<Map<String, String>> userInitMapList = PersonnelExcelReader.excelReader();
        userInitMapList.forEach(userMap -> {
            DepartmentCategory departmentCategory = Arrays.stream(DepartmentCategory.values()).filter(category -> {
                return category.name().equals(userMap.get(PersonnelHeader.DEPARTMENT_CATEGORY.getName()));
            }).findFirst().orElseThrow(() -> {
                return new IllegalArgumentException("부서 카테고리가 잘못되었습니다.");
            });

            departmentRepository.findByNameAndCategory(userMap.get(PersonnelHeader.DEPARTMENT_NAME.getName()),
                    departmentCategory)
                .ifPresent((department) -> {
                    UserRole role = UserRole.NORMAL;
                    if ("대표이사".equals(userMap.get(PersonnelHeader.POSITION.getName()))) {
                        role = UserRole.MASTER;
                    }
                    String email = "이메일 없음";
                    if (StringUtils.hasText(userMap.get(PersonnelHeader.COMPANY_EMAIL.getName()))) {
                        email = userMap.get(PersonnelHeader.COMPANY_EMAIL.getName());
                    }

                    em.persist(
                        UserInvitation.of(
                            email,
                            userMap.get(PersonnelHeader.EMPLOYEE_NAME.getName()),
                            department,
                            role
                        ));
                    em.flush();

                    User newUser = User.of(
                        userMap.get(PersonnelHeader.EMPLOYEE_ID.getName()),
                        "qwe123",
                        userMap.get(PersonnelHeader.EMPLOYEE_NAME.getName()),
                        email,
                        department,
                        role
                    );
                    em.persist(newUser);
                    em.flush();

                    Personnel personnelInfo = Personnel.of(newUser);
                    List<PersonnelJob> jobList = new ArrayList<>();
                    PersonnelJob job = PersonnelJob.of(
                        department,
                        null,
                        null,
                        userMap.get(PersonnelHeader.POSITION.getName()),
                        userMap.get(PersonnelHeader.POSITION.getName()),
                        userMap.get(PersonnelHeader.DUTY.getName()),
                        Boolean.TRUE
                    );
                    em.persist(job);
                    em.flush();
                    jobList.add(job);

                    personnelInfo.change(
                        PersonnelBasic.of(
                            null,
                            getDate(userMap, PersonnelHeader.BIRTH_DATE.getName()),
                            userMap.get(PersonnelHeader.SEX.getName()),
                            null,
                            null,
                            userMap.get(PersonnelHeader.MOBILE.getName()),
                            null,
                            null,
                            userMap.get(PersonnelHeader.PERSONAL_EMAIL.getName())
                        ),
                        PersonnelCompany.of(
                            getDate(userMap, PersonnelHeader.JOIN_DATE.getName()),
                            null,
                            null
                        ),
                        jobList,
                        null,
                        null,
                        null,
                        null
                    );

                    em.persist(personnelInfo);
                    em.flush();

                    em.clear();
                });
        });
    }

    private static LocalDate getDate(Map<String, String> salesMap, String type) {
        String[] splitDate = salesMap.get(type).split("-");
        String year = splitDate[2];
        String month = String.format("%02d", Integer.parseInt(splitDate[1].split("월")[0]));
        String day = splitDate[0];
        return LocalDate.parse(String.format("%s-%s-%s", year, month, day));
    }
}
