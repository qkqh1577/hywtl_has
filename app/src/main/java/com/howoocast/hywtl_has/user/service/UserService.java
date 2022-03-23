package com.howoocast.hywtl_has.user.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.parameter.UserAddParameter;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.howoocast.hywtl_has.user.view.UserView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final DepartmentRepository departmentRepository;

    @Transactional(readOnly = true)
    public Page<UserView> page(Pageable pageable) {
        return userRepository.findAll(pageable).map(UserView::assemble);
    }

    @Transactional(readOnly = true)
    public UserView get(Long id) {
        return userRepository.findById(id).map(UserView::assemble).orElseThrow(NotFoundException::new);
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
        user = userRepository.save(user);
        return UserView.assemble(user);
    }

}
