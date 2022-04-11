package com.howoocast.hywtl_has.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
            .headers()
            .cacheControl().and().contentTypeOptions().disable()
            .and()
            .httpBasic().disable()
            .csrf().disable()
            .cors().disable()
            .authorizeRequests()
            .antMatchers(HttpMethod.GET, "/")
            .permitAll()
            .antMatchers("/**")
            // TODO: 권한 및 url 체계 확정 후 denyAll로 전환
            .permitAll()
        ;
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
}
