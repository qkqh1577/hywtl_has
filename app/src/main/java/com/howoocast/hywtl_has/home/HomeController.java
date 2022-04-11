package com.howoocast.hywtl_has.home;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@Controller
public class HomeController {

    @GetMapping("/")
    public ModelAndView indexView(ModelAndView mav) {
        mav.setViewName("index");
        return mav;
    }

    @GetMapping("/{*path}")
    public ModelAndView pathIndexView(ModelAndView mav, @PathVariable String path) {
        mav.setViewName("index");
        log.debug("[trim path] {}", path);
        mav.addObject("path", path);
        return mav;
    }
}
