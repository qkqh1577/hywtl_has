package com.howoocast.hywtl_has.migration.service;

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
        final int userCount = 100;

        final String[] departments=new String[]{
                "한양풍동실험연구소",
                "총괄본부",
                "영업본부",
                "기술본부",
                "경영전략본부",
                "기술팀",
                "영업팀",
                "모형팀",
                "마케팅팀",
                "기술 부서",
                "실험 부서",
                "편집 부서",
                "영업 부서",
                "마케팅 부서",
                "디자인 1부서",
                "디자인 2부서",
                "기계제작 부서",
                "튜빙 부서"
        };

        for(int i=0;i<userCount;i++){

            String userId   = i==0? "admin" : String.format("user%d",i);
            String name     = i==0? "관리자" : String.format("사용자%d",i);
            String email    = i==0? "woo@howoocast.com" : String.format("user%d@howoocast.com",i);
            UserRole role   = i==0? UserRole.MASTER: UserRole.NORMAL;

            String departmentName = departments[i%departments.length];
            DepartmentCategory category = null;

            if(departmentName.endsWith("연구소")){
                category = DepartmentCategory.COMPANY;
            } else if(departmentName.endsWith("본부")){
                category = DepartmentCategory.HQ;
            } else if(departmentName.endsWith("팀")){
                category = DepartmentCategory.TEAM;
            } else if(departmentName.endsWith("부서")){
                category = DepartmentCategory.PART;
            } else {
                category = DepartmentCategory.EXTRA;
            }

            departmentRepository.findByNameAndCategory(departmentName,
                    category).ifPresent(department -> {
                em.persist(
                    UserInvitation.of(
                        email,
                        name,
                        department,
                        role
                ));

                em.persist(
                    User.of(
                        userId,
                        "qwe123",
                        name,
                        email,
                        department,
                        role
                    )
                );
                em.flush();
                em.clear();
            });
        }

    }
}
