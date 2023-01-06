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
        userRepository.findByUsername("admin").ifPresent(a -> {
            Personnel admin = Personnel.of(a);
            em.persist(admin);

        });
    }

}
