package com.howoocast.hywtl_has.configuration;

import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@WebListener
public class SessionConfiguration implements HttpSessionListener {

    private static final Map<String, HttpSession> sessions = new ConcurrentHashMap<>();

    static private int activeSessions = 0;
    @Override
    public void sessionCreated(HttpSessionEvent se) {
        // 세션 생성시
//        log.info("session create getAttributeNames {}", se.getSession().getAttributeNames());
//        log.info("session create getAttribute {}", se.getSession().getAttribute("JSESSIONID"));
//        log.info("session create getCreationTime {}", se.getSession().getCreationTime());
//        log.info("session create getId {}", se.getSession().getId());
//        log.info("session create getLastAccessedTime {}", se.getSession().getLastAccessedTime());
//        log.info("session create getMaxInactiveInterval {}", se.getSession().getMaxInactiveInterval());
//        activeSessions++;
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        // 세션 삭제시
        log.warn("session destroy getId {}", se.getSession().getId());
        if (Objects.nonNull(se.getSession().getId())) {
            sessions.remove(se.getSession().getId());
        }
//        activeSessions--;
    }
}
