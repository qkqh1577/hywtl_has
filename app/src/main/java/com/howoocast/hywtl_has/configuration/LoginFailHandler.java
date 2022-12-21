package com.howoocast.hywtl_has.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor.ErrorBody;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

public class LoginFailHandler implements AuthenticationFailureHandler {

    ObjectMapper objectMapper = new ObjectMapper();
    @Override
    public void onAuthenticationFailure(
        HttpServletRequest request,
        HttpServletResponse response,
        AuthenticationException exception) throws IOException, ServletException {
            response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        if (exception instanceof UsernameNotFoundException) {
            response.getWriter()
                .write(objectMapper
                    .writeValueAsString(
                        new ErrorBody("UsernameNotFoundException", "아이디 또는 비밀번호를 확인해주세요."))
                );
        }
        else if (exception instanceof BadCredentialsException) {
            response.getWriter()
                .write(objectMapper
                    .writeValueAsString(
                        new ErrorBody("BadCredentialsException", "아이디 또는 비밀번호를 확인해주세요"))
                );
        }
    }
}
