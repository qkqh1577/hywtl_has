package com.howoocast.hywtl_has.configuration;

import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Slf4j
@Configuration
@EnableJpaAuditing
@RequiredArgsConstructor
public class AuditConfiguration {

    private final UserRepository userRepository;

    @Bean
    public AuditorAware<Long> auditorProvider() {
        log.debug("[Audit] incoming...");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.debug("[Audit] authentication: {}", authentication);
        return () -> {
            if (Objects.isNull(authentication)) {
                return Optional.empty();
            }
            return userRepository.findByUsernameAndDeletedAtIsNull(authentication.getName())
                .map(User::getId);
        };
    }
}
