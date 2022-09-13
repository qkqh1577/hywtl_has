package com.howoocast.hywtl_has.configuration;

import com.howoocast.hywtl_has.common.util.UsernameExtractor;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.Objects;
import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.FlushModeType;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Configuration
@EnableJpaAuditing
@RequiredArgsConstructor
public class AuditConfiguration {

    private final UserRepository userRepository;
    private final EntityManager entityManager;

    @Bean
    public AuditorAware<Long> auditorProvider() {
        return () -> {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (Objects.isNull(authentication)) {
                return Optional.empty();
            }
            entityManager.setFlushMode(FlushModeType.COMMIT);
            Optional<Long> result = userRepository.findByUsername(UsernameExtractor.get(authentication))
                .map(User::getId);
            entityManager.setFlushMode(FlushModeType.AUTO);
            return result;
        };
    }
}
