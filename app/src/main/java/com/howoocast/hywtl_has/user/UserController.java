package com.howoocast.hywtl_has.user;

import com.howoocast.hywtl_has.user.service.UserService;
import com.howoocast.hywtl_has.user.view.UserView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/users")
    public Page<UserView> page(Pageable pageable) {
        return userService.page(pageable);
    }

    @GetMapping("/users/{id}")
    public UserView get(@PathVariable Long id) {
        return userService.get(id);
    }
}
