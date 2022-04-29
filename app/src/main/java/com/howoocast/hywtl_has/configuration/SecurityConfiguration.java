package com.howoocast.hywtl_has.configuration;

import com.howoocast.hywtl_has.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Value("${application.mail.invalidate-duration}")
    private String invalidateDuration;
    private final UserRepository userRepository;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
            .headers()
            .cacheControl().and().contentTypeOptions().disable()
            .and()
            // TODO: CSRF 처리 필요
            .cors().disable()
            .csrf().disable()
            .httpBasic().disable()
            .formLogin()
            .loginPage("/login")
            .defaultSuccessUrl("/")
            .successHandler(new LoginSuccessHandler(userRepository, invalidateDuration))
            .and()
            .logout()
            .logoutUrl("/logout")
            .logoutSuccessUrl("/login")
            .and()
            .authorizeRequests()
            .antMatchers(
                HttpMethod.GET,
                "/",
                "/user-verification/user-invitation/authenticate",
                "/user-verification/password-reset/authenticate",
                "/user/authenticate",
                "/user/password-reset",
                "/users/login",
                "/login",
                "errors/*"
            )
            .permitAll()
            .antMatchers(HttpMethod.POST,
                "/user-verification/user-invitation",
                "/user-verification/password-reset",
                "/user/invite",
                "/user/password-validate"
            )
            .permitAll()
            .antMatchers("/**")
            // TODO: 권한 및 url 체계 확정 후 denyAll 전환
            .authenticated()

        ;
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new LoginEntryPointService(userRepository);
    }
}
