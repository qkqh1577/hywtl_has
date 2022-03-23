package com.howoocast.hywtl_has.home;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@Controller
public class HomeController {

    @GetMapping("/")
    public ModelAndView indexView(ModelAndView mav) {
        mav.setViewName("index");
        return mav;
    }

    @RequestMapping("portal")
    public ModelAndView appView(ModelAndView mav) {
        mav.setViewName("app");
        return mav;
    }

}
