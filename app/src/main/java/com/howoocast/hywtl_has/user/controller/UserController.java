package com.howoocast.hywtl_has.user.controller;

import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user.parameter.UserAddParameter;
import com.howoocast.hywtl_has.user.parameter.UserChangeParameter;
import com.howoocast.hywtl_has.user.parameter.UserPasswordChangeParameter;
import com.howoocast.hywtl_has.user.parameter.UserPredicateBuilder;
import com.howoocast.hywtl_has.user.service.UserService;
import com.howoocast.hywtl_has.user.view.UserDetailView;
import com.howoocast.hywtl_has.user.view.UserListView;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
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
    public Page<UserListView> page(
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

    @GetMapping("/users/login")
    public UserDetailView getLogin(Authentication authentication) {
        try {
            String username = authentication.getName();
            log.debug("[Login] username: {}", username);
            return userService.get(username);
        } catch (Exception e) {
            throw new IllegalRequestException("로그인이 필요합니다.");
        }
    }

    @GetMapping("/users/{id}")
    public UserDetailView get(@PathVariable Long id) {
        return userService.get(id);
    }

    @PostMapping("/users")
    public UserDetailView add(@Valid @RequestBody UserAddParameter params) {
        return userService.add(params);
    }

    @PostMapping("/users/{id}/password/reset")
    public UserDetailView resetPassword(@PathVariable Long id) {
        return userService.resetPassword(id);
    }

    @PatchMapping("/users/{id}")
    public UserDetailView change(@PathVariable Long id, @Valid @RequestBody UserChangeParameter params) {
        return userService.change(id, params);
    }

    @PatchMapping("/users/{id}/password")
    public UserDetailView changePassword(@PathVariable Long id, @Valid @RequestBody UserPasswordChangeParameter params) {
        return userService.changePassword(id, params);
    }

    @DeleteMapping("/users/{id}")
    public void delete(@PathVariable Long id) {

    }


}