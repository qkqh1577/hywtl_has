package com.howoocast.hywtl_has.common.controller;

import java.util.Objects;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@Controller
public class HomeController {

    @GetMapping("/")
    public ModelAndView indexView(
        ModelAndView mav,
        Authentication authentication,
        HttpServletResponse response
    ) throws Exception {
        mav.setViewName("index");
        if (Objects.isNull(authentication) || !authentication.isAuthenticated()) {
            response.sendRedirect("/login");
            return mav;
        }
        return mav;
    }
}
