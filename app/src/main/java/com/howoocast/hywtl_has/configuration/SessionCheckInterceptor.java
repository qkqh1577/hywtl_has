package com.howoocast.hywtl_has.configuration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
public class SessionCheckInterceptor implements HandlerInterceptor {

    @Value("${server.servlet.session.timeout}")
    private String timeout;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
        throws Exception {
//        HttpSession session = request.getSession(false);
////        log.warn("getMaxInactiveInterval: {}", session.getMaxInactiveInterval()); // 최대 세션 유지 시간
////        log.warn("getCreationTime: {}", session.getCreationTime()); // 세션이 생성된 시간
////        log.warn("getLastAccessedTime: {}", session.getLastAccessedTime()); // 최근 세션에 접근한 시간.
////        log.warn("sum: {}", session.getLastAccessedTime() + session.getMaxInactiveInterval() * 1000L); // 세션이 생성된 시간
////        log.warn("System.currentTimeMillis(): {}", System.currentTimeMillis()); // 최근 세션에 접근한 시간.
////        log.warn("result : {}", session.getLastAccessedTime() + (session.getMaxInactiveInterval() * 1000L) < System.currentTimeMillis());
//        if(session.getLastAccessedTime() + (session.getMaxInactiveInterval() * 1000L) < System.currentTimeMillis() || Objects.isNull(session)) {
//            log.warn("세션 만료");
//            session.invalidate();
////            response.sendRedirect("/login");
//            return false;
//        }
//
////        if (Objects.isNull(session)) {
////            log.warn("Session is null");
////            response.sendRedirect("/login");
////            return false;
////        }
        return true;
    }
}
