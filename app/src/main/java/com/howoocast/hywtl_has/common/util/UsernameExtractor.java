package com.howoocast.hywtl_has.common.util;

import java.util.Objects;
import org.springframework.security.core.Authentication;

public final class UsernameExtractor {

    public static String get(Authentication authentication) {
        if (Objects.isNull(authentication)
            || Objects.isNull(authentication.getName())
            || authentication.getName().isEmpty()
            || !authentication.isAuthenticated()
            || authentication.getName().equals("anonymousUser")) {
            return "admin";
        }
        return authentication.getName();
    }
}
