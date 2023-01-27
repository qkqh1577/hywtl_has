package com.howoocast.hywtl_has.login.controller;

import com.howoocast.hywtl_has.common.util.UsernameExtractor;
import com.howoocast.hywtl_has.login.exception.UserLoginException;
import com.howoocast.hywtl_has.login.exception.UserLoginException.UserLoginExceptionType;
import com.howoocast.hywtl_has.login.parameter.LoginUserChangeParameter;
import com.howoocast.hywtl_has.login.parameter.UserValidatePasswordParameter;
import com.howoocast.hywtl_has.login.service.LoginService;
import com.howoocast.hywtl_has.user.view.UserView;
import java.io.IOException;
import java.util.Arrays;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService service;

    @GetMapping("/user/login")
    public UserView getLogin(Authentication authentication) {
        try {
            return UserView.assemble(service.get(authentication.getName()));
        } catch (Exception e) {
            throw new UserLoginException(UserLoginExceptionType.NOT_AUTHENTICATED);
        }
    }

    @PostMapping("/user/password-validate")
    public void validatePassword(@Valid @RequestBody UserValidatePasswordParameter parameter) {
        service.validatePassword(parameter);
    }

    @PutMapping("/user/login")
    public void change(
        Authentication authentication,
        @Valid @ModelAttribute LoginUserChangeParameter parameter) {
        service.change(UsernameExtractor.get(authentication), parameter);
    }

    @GetMapping("/login/session")
    public boolean hasSession(HttpServletRequest request, HttpServletResponse response, HttpSession httpSession) throws IOException {
        log.warn("httpSession.getLastAccessedTime() : {}", httpSession.getLastAccessedTime());
        HttpSession session = request.getSession(false);
        log.warn("session: {}", session.getId());
        log.warn("session.getLastAccessedTime(): {}", session.getLastAccessedTime());
        log.warn("minus : {}", System.currentTimeMillis() - session.getLastAccessedTime());
        log.warn("System.currentTimeMillis(): {}", System.currentTimeMillis());
        if (session.getMaxInactiveInterval() * 1000L < System.currentTimeMillis() - session.getLastAccessedTime()) {
            log.warn("세션 만료");
            Cookie[] cookies = request.getCookies();
            Arrays.stream(cookies).forEach(cookie -> {
                if ("JSESSIONID".equals(cookie.getName())) {
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                }
            });

//            session.removeAttribute("JSESSIONID");
//            session.invalidate();
            log.warn("after invalidate session: {}", session.getId());
            return true;
        }

        return false;
    }
}
