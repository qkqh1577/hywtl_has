package com.howoocast.hywtl_has.migration.init;

import com.howoocast.hywtl_has.department.domain.DepartmentCategory;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user_verification.domain.UserInvitation;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class UserInitDataService {

    @PersistenceContext
    private EntityManager em;

    private final DepartmentRepository departmentRepository;

    @Transactional
    public void init() {

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
    }
}
