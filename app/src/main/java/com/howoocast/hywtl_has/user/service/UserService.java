package com.howoocast.hywtl_has.user.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.parameter.UserAddParameter;
import com.howoocast.hywtl_has.user.parameter.UserChangeParameter;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.howoocast.hywtl_has.user.view.UserView;
import com.querydsl.core.types.Predicate;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final DepartmentRepository departmentRepository;

    @Transactional(readOnly = true)
    public Page<UserView> page(
            @Nullable Predicate predicate,
            Pageable pageable
    ) {
        return Optional.ofNullable(predicate)
                .map(p -> userRepository.findAll(p, pageable))
                .orElse(userRepository.findAll(pageable))
                .map(UserView::assemble);
    }

    @Transactional(readOnly = true)
    public UserView get(Long id) {
        return UserView.assemble(this.load(id));
    }

    @Transactional
    public UserView add(UserAddParameter params) {
        Department department = departmentRepository.findById(params.getDepartmentId())
                .orElseThrow(NotFoundException::new);

        User user = User.add(
                userRepository,
                params.getUsername(),
                params.getPassword(),
                params.getName(),
                params.getEmail(),
                department,
                params.getUserRole()
        );
        return this.save(user);
    }

    @Transactional
    public UserView change(Long id, UserChangeParameter params) {
        User user = this.load(id);
        user.change(params.getName(), params.getEmail());
        return this.save(user);
    }

    private User load(Long id) {
        return userRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    private UserView save(User source) {
        return UserView.assemble(userRepository.save(source));
    }

}