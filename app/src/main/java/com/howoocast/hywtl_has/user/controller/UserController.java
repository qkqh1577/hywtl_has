package com.howoocast.hywtl_has.user.controller;

import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user.exception.UserLoginException;
import com.howoocast.hywtl_has.user.exception.UserLoginException.UserLoginExceptionType;
import com.howoocast.hywtl_has.user.parameter.LoginUserChangeParameter;
import com.howoocast.hywtl_has.user.parameter.UserAddParameter;
import com.howoocast.hywtl_has.user.parameter.UserChangeParameter;
import com.howoocast.hywtl_has.user.parameter.UserPasswordChangeParameter;
import com.howoocast.hywtl_has.user.parameter.UserPredicateBuilder;
import com.howoocast.hywtl_has.user.parameter.UserValidatePasswordParameter;
import com.howoocast.hywtl_has.user.service.UserService;
import com.howoocast.hywtl_has.user.view.LoginUserView;
import com.howoocast.hywtl_has.user.view.UserView;
import com.howoocast.hywtl_has.user.view.UserShortView;
import com.howoocast.hywtl_has.user_verification.service.PasswordResetService;
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
import org.springframework.web.bind.annotation.ModelAttribute;
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
    private final PasswordResetService passwordResetService;

    @GetMapping("/users")
    public Page<UserShortView> page(
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

    @GetMapping("/users/all")
    public List<UserShortView> getAll() {
        return userService.getAll();
    }

    @GetMapping("/users/login")
    public UserView getLogin(Authentication authentication) {
        try {
            String username = authentication.getName();
            log.debug("[Login] username: {}", username);
            return userService.get(username);
        } catch (Exception e) {
            throw new UserLoginException(UserLoginExceptionType.NOT_AUTHENTICATED);
        }
    }

    @GetMapping("/users/{id}")
    public UserView get(@PathVariable Long id) {
        return userService.get(id);
    }

    @PostMapping("/user/invite")
    public UserView add(@Valid @RequestBody UserAddParameter parameter) {
        return userService.add(parameter);
    }

    @PostMapping("/user/password-validate")
    public void validatePassword(@Valid @RequestBody UserValidatePasswordParameter parameter) {
        userService.validatePassword(parameter);
    }

    @PostMapping("/users/{id}/reset-password")
    public void resetPassword(@PathVariable Long id) {
        passwordResetService.reset(id);
    }

    @PatchMapping("/users/{id}")
    public UserView change(@PathVariable Long id, @Valid @RequestBody UserChangeParameter parameter) {
        userService.change(id, parameter);
        return userService.get(id);
    }

    @PatchMapping("/users/{id}/password")
    public UserView changePassword(@PathVariable Long id, @Valid @RequestBody UserPasswordChangeParameter parameter) {
        userService.changePassword(id, parameter);
        return userService.get(id);
    }

    @DeleteMapping("/users/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }

    @PostMapping("/user/login")
    public LoginUserView edit(
        Authentication authentication,
        @Valid @ModelAttribute LoginUserChangeParameter parameter) {
        return LoginUserView.assemble(userService.edit(authentication.getName(), parameter));
    }
}
