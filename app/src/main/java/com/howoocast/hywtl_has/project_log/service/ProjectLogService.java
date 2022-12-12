package com.howoocast.hywtl_has.project_log.service;

import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.common.util.UsernameExtractor;
import com.howoocast.hywtl_has.project_log.domain.ProjectLog;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import com.howoocast.hywtl_has.project_log.repository.ProjectLogSearchRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.querydsl.core.types.Predicate;
import java.util.Objects;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectLogService {

    private final ProjectLogSearchRepository repository;
    private final UserRepository userRepository;


    @Transactional(readOnly = true)
    public Page<ProjectLog> page(
        Predicate predicate,
        Pageable pageable
    ) {
        return repository
            .findAll(predicate, pageable)
            .map(instance -> {
                instance.setUser(
                    new CustomFinder<>(userRepository, User.class).byId(instance.getUserId()));
                return instance;
            });
    }

    private static final String rootUrl = "/project/sales";

    @TransactionalEventListener(classes = ProjectLogEvent.class, phase = TransactionPhase.BEFORE_COMMIT)
    public void add(ProjectLogEvent event) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HttpServletRequest request = Objects.requireNonNull(
            (ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String requestUrl = request.getRequestURI();
        if (!requestUrl.startsWith(rootUrl)) {
            // 영업 정보 프로젝트가 아닌 경우 이력 발행하지 않음
            return;
        }
        if (request.getMethod().equalsIgnoreCase("get")) {
            // 변경이 없는 조회인 경우 이력 발행하지 않음
            return;
        }
        String username = UsernameExtractor.get(authentication);
        User user = userRepository.findByUsername(username).orElseThrow(() -> {
            throw new NotFoundException(User.KEY, "username", username);
        });

        repository.save(event.build(
            Objects.requireNonNull(user.getId()),
            this.getTabName(requestUrl, event.getProjectId()),
            this.getSectionName(requestUrl, event.getProjectId())
        ));
    }

    private String getTabName(String requestUrl, Long projectId) {

        if (requestUrl.equals(rootUrl)
            || requestUrl.equals(String.format(rootUrl + "/%d/status", projectId))
            || requestUrl.startsWith(String.format(rootUrl + "/%d/basic", projectId))
            || requestUrl.startsWith(rootUrl + "/basic/")
        ) {
            return "기본 정보";
        }
        if (requestUrl.startsWith(String.format(rootUrl + "/%d/complex", projectId))
            || requestUrl.startsWith(rootUrl + "/complex/")
        ) {
            return "단지 정보";
        }
        if (requestUrl.startsWith(String.format(rootUrl + "/%d/estimate", projectId))
            || requestUrl.startsWith(rootUrl + "/estimate/")
            || requestUrl.startsWith(String.format(rootUrl + "/%d/custom-estimate", projectId))
            || requestUrl.startsWith(rootUrl + "/custom-estimate/")
            || requestUrl.startsWith(String.format(rootUrl + "/%d/system-estimate", projectId))
            || requestUrl.startsWith(rootUrl + "/system-estimate/")
            || requestUrl.startsWith(String.format(rootUrl + "/%d/rival-estimate", projectId))
            || requestUrl.startsWith(rootUrl + "/rival-estimate/")
            || requestUrl.startsWith(String.format(rootUrl + "/%d/bid", projectId))
            || requestUrl.startsWith(String.format(rootUrl + "/%d/rival-bid", projectId))
            || requestUrl.startsWith(rootUrl + "/rival-bid/")
            || requestUrl.startsWith(String.format(rootUrl + "/%d/contract", projectId))
            || requestUrl.startsWith(rootUrl + "/contract/")
        ) {
            return "견적/계약";
        }
        if (requestUrl.startsWith(String.format(rootUrl + "/%d/progress", projectId))
            || requestUrl.startsWith(rootUrl + "/progress/")
            || requestUrl.startsWith(String.format(rootUrl + "/%d/collection", projectId))
            || requestUrl.startsWith(rootUrl + "/collection/")) {
            return "진행 정보";
        }
        if (requestUrl.startsWith(String.format(rootUrl + "/%d/document", projectId))
            || requestUrl.startsWith(rootUrl + "/document/")) {
            return "자료";
        }
        if (requestUrl.startsWith(String.format(rootUrl + "/%d/schedule", projectId))
            || requestUrl.startsWith(rootUrl + "/schedule/")) {
            return "일정";
        }
        if (requestUrl.startsWith(String.format(rootUrl + "/%d/memo", projectId))
            || requestUrl.startsWith(rootUrl + "/memo/")) {
            return "메모";
        }
        if (requestUrl.startsWith(String.format(rootUrl + "/%d/log", projectId))
            || requestUrl.startsWith(rootUrl + "/log/")) {
            return "이력";
        }

        throw new IllegalRequestException(ProjectLog.KEY + ".tab_name.pattern", "요청 주소가 유효하지 않은 탭명입니다.");
    }

    private String getSectionName(String requestUrl, Long projectId) {
        // 프로젝트
        if (requestUrl.equals(rootUrl)
            || requestUrl.equals(String.format(rootUrl + "/%d/status", projectId))) {
            return "프로젝트";
        }

        // 기본 정보
        if (requestUrl.equals(String.format(rootUrl + "/%d/basic", projectId))) {
            return "기본 정보";
        }
        if (requestUrl.equals(String.format(rootUrl + "/%d/basic/contributor/internal", projectId))
            || requestUrl.startsWith(rootUrl + "/basic/contributor/internal/")
        ) {
            return "수주 기여자 - 사내";
        }
        if (requestUrl.equals(String.format(rootUrl + "/%d/basic/contributor/external", projectId))
            || requestUrl.startsWith(rootUrl + "/basic/contributor/external/")
        ) {
            return "수주 기여자 - 사외";
        }
        if (requestUrl.equals(String.format(rootUrl + "/%d/basic/business", projectId))
            || requestUrl.startsWith(rootUrl + "/basic/business/")
        ) {
            return "관계사";
        }
        if (requestUrl.equals(String.format(rootUrl + "/%d/basic/design", projectId))) {
            return "설계 개요";
        }
        if (requestUrl.equals(String.format(rootUrl + "/%d/basic/fail-reason", projectId))) {
            return "수주 실패";
        }

        // 단지 정보
        if (requestUrl.equals(String.format(rootUrl + "/%d/complex/site", projectId))
            || requestUrl.startsWith(rootUrl + "/complex/site/")) {
            return "대지 모형";
        }
        if (requestUrl.equals(String.format(rootUrl + "/%d/complex/building", projectId))
            || requestUrl.startsWith(rootUrl + "/complex/building/")) {
            return "동";
        }

        // 견적/계약
        if (requestUrl.startsWith(String.format(rootUrl + "/%d/estimate", projectId))) {
            return "견적서";
        }
        if (requestUrl.equals(String.format(rootUrl + "/%d/custom-estimate", projectId))
            || requestUrl.startsWith(rootUrl + "/custom-estimate/")) {
            return "커스텀 견적서";
        }
        if (requestUrl.equals(String.format(rootUrl + "/%d/system-estimate", projectId))
            || requestUrl.startsWith(rootUrl + "/system-estimate/")) {
            return "시스템 견적서";
        }
        if (requestUrl.startsWith(String.format(rootUrl + "/%d/rival-estimate", projectId))
            || requestUrl.startsWith(rootUrl + "/rival-estimate/")) {
            return "경쟁 업체 견적";
        }
        if (requestUrl.startsWith(String.format(rootUrl + "/%d/bid", projectId))) {
            return "입찰 정보";
        }
        if (requestUrl.startsWith(String.format(rootUrl + "/%d/rival-bid", projectId))
            || requestUrl.startsWith(rootUrl + "/rival-bid/")) {
            return "경쟁 업체 입찰";
        }
        if (requestUrl.startsWith(String.format(rootUrl + "/%d/contract", projectId))
            || requestUrl.startsWith(rootUrl + "/contract/")) {
            return "계약서";
        }

        // 진행 정보
        if (requestUrl.startsWith(String.format(rootUrl + "/%d/progress", projectId))
            || requestUrl.startsWith(rootUrl + "/progress/")) {
            return "진행 정보";
        }
        if (requestUrl.startsWith(String.format(rootUrl + "/%d/collection", projectId))
            || requestUrl.startsWith(rootUrl + "/collection/")) {
            return "기성 정보";
        }

        // 자료
        if (requestUrl.startsWith(String.format(rootUrl + "/%d/document", projectId))
            || requestUrl.startsWith(rootUrl + "/document/")) {
            return "자료";
        }

        // 일정
        if (requestUrl.startsWith(String.format(rootUrl + "/%d/schedule", projectId))
            || requestUrl.startsWith(rootUrl + "/schedule/")) {
            return "일정";
        }

        // 메모
        if (requestUrl.startsWith(String.format(rootUrl + "/%d/memo", projectId))
            || requestUrl.startsWith(rootUrl + "/memo/")) {
            return "메모";
        }

        // 이력
        if (requestUrl.startsWith(String.format(rootUrl + "/%d/log", projectId))
            || requestUrl.startsWith(rootUrl + "/log/")) {
            return "이력";
        }

        throw new IllegalRequestException(ProjectLog.KEY + ".section_name.pattern", "요청 주소가 유효하지 않은 섹션명입니다.");
    }

}
