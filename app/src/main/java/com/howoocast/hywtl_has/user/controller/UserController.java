package com.howoocast.hywtl_has.user.controller;

import com.howoocast.hywtl_has.login.parameter.UserPasswordChangeParameter;
import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user.parameter.UserAddParameter;
import com.howoocast.hywtl_has.user.parameter.UserChangeParameter;
import com.howoocast.hywtl_has.user.parameter.UserPredicateBuilder;
import com.howoocast.hywtl_has.user.service.UserService;
import com.howoocast.hywtl_has.user.view.UserShortView;
import com.howoocast.hywtl_has.user.view.UserView;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/admin/user")
    public Page<UserShortView> page(
        @RequestParam(required = false, name = "role") List<UserRole> roleList,
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

    @GetMapping("/user")
    public List<UserShortView> getAll(
        @RequestParam(required = false) String keyword
    ) {
        return userService.getAll(
                new UserPredicateBuilder()
                    .keyword(keyword)
                    .build())
            .stream()
            .map(UserShortView::assemble)
            .collect(Collectors.toList());
    }

    @GetMapping("/admin/user/{id}")
    public UserView get(@PathVariable Long id) {
        return userService.get(id);
    }

    @PostMapping("/user")
    public void add(@Valid @RequestBody UserAddParameter parameter) {
        userService.add(parameter);
    }


    @PostMapping("/admin/user/{id}/reset-password")
    public void resetPassword(@PathVariable Long id) {
        userService.resetPassword(id);
    }


    @PutMapping("/admin/user/{id}")
    public void change(@PathVariable Long id, @Valid @RequestBody UserChangeParameter parameter) {
        userService.change(id, parameter);
    }

    @PatchMapping("/admin/user/{id}/password")
    public void changePassword(@PathVariable Long id, @Valid @RequestBody UserPasswordChangeParameter parameter) {
        userService.changePassword(id, parameter);
    }

    @DeleteMapping("/admin/user/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
