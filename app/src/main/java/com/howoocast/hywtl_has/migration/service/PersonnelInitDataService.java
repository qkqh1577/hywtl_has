package com.howoocast.hywtl_has.migration.service;

import com.howoocast.hywtl_has.personnel.domain.Personnel;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PersonnelInitDataService {
    @PersistenceContext
    private EntityManager em;

    private final UserRepository userRepository;
    @Transactional
    public void init() {
        final int userCount = 100;
        for(int i=0;i<userCount;i++) {
            String userId   = i==0? "admin" : String.format("user%d",i);
            userRepository.findByUsername(userId).ifPresent(a -> {
                Personnel personnel = Personnel.of(a);
                em.persist(personnel);
                em.flush();
                em.clear();
            });
        }
    }

}
