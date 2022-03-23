package com.howoocast.hywtl_has.user;

import com.howoocast.hywtl_has.user.domain.UserRole;
import com.howoocast.hywtl_has.user.parameter.UserAddParameter;
import com.howoocast.hywtl_has.user.parameter.UserChangeParameter;
import com.howoocast.hywtl_has.user.parameter.UserPredicateBuilder;
import com.howoocast.hywtl_has.user.service.UserService;
import com.howoocast.hywtl_has.user.view.UserView;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/users")
    public Page<UserView> page(
            @RequestParam(required = false, name = "role[]") List<UserRole> roleList,
            @RequestParam(required = false) String keywordType,
            @RequestParam(required = false) String keyword,
            Pageable pageable
    ) {
        return userService.page(
                new UserPredicateBuilder()
                        .role(roleList)
                        .keyword(keywordType, keyword)
                        .build(),
                pageable
        );
    }

    @GetMapping("/users/{id}")
    public UserView get(@PathVariable Long id) {
        return userService.get(id);
    }

    @PostMapping("/users")
    public UserView add(@Valid @RequestBody UserAddParameter params) {
        return userService.add(params);
    }

    @PatchMapping("/users/{id}")
    public UserView change(@PathVariable Long id, @Valid @RequestBody UserChangeParameter params) {
        return userService.change(id, params);
    }
}