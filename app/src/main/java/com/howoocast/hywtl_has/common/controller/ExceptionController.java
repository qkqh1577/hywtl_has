package com.howoocast.hywtl_has.common.controller;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;
import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor.ErrorBody;
import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.util.KoreanLetterUtil;
import java.util.Objects;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ExceptionController {

    private String getMessage(String code) {
        String value = null;

        switch (code) {
            case "department.name.not-blank":
                value = "부서명";
                break;
            case "department.category.not-null":
                value = "부서 유형";
                break;
            case "department.tree.list.not-null":
                value = "부서 구조";
                break;
            case "department.tree.id.not-null":
                value = "부서 고유 번호";
                break;
            case "department.tree.seq.not-null":
                value = "정렬 순서";
                break;
            case "personnel.academic.academy-name.not-blank":
                value = "교육기관명";
                break;
            case "personnel.academic.major.not-blank":
                value = "전공";
                break;
            case "personnel.academic.start-date.not-null":
                value = "시작일";
                break;
            case "personnel.academic.end-date.not-null":
                value = "종료일";
                break;
            case "personnel.academic.state.not-blank":
                value = "재적 상태";
                break;
            case "personnel.basic.eng-name.not-blank":
                value = "영문명";
                break;
            case "personnel.basic.birth-date.not-null":
                value = "생년월일";
                break;
            case "personnel.basic.sex.not-blank":
                value = "성별";
                break;
            case "personnel.career.company-name.not-blank":
                value = "근무처명";
                break;
            case "personnel.career.start-date.not-null":
                value = "근무시작일";
                break;
            case "personnel.career.end-date.not-null":
                value = "근무종료일";
                break;
            case "personnel.career.major-job.not-blank":
                value = "주 업무";
                break;
            case "personnel.company.hired-date.not-null":
                value = "입사일";
                break;
            case "personnel.company.hired-type.not-blank":
                value = "입사 구분";
                break;
            case "personnel.job.department-id.not-null":
                value = "소속 부서";
                break;
            case "personnel.job.job-title.not-blank":
                value = "직함";
                break;
            case "personnel.job.job-type.not-blank":
                value = "직종";
                break;
            case "personnel.job.job-position.not-blank":
                value = "직위";
                break;
            case "personnel.language.name.not-blank":
                value = "자격증명";
                break;
            case "personnel.language.type.not-blank":
                value = "자격증 대상 언어";
                break;
            case "personnel.language.organization-name.not-blank":
                value = "발급기관명";
                break;
            case "personnel.language.certified-date.not-null":
                value = "취득일";
                break;
            case "personnel.license.name.not-blank":
                value = "면허명";
                break;
            case "personnel.license.organization-name.not-blank":
                value = "발급기관명";
                break;
            case "personnel.license.qualified-number.not-blank":
                value = "승인 번호";
                break;
            case "personnel.license.qualified-date.not-null":
                value = "승인 일자";
                break;
            case "personnel.id.not-null":
                value = "유저";
                break;
            case "personnel.basic.not-null":
                value = "유저 기본 정보";
                break;
            case "personnel.company.not-null":
                value = "유저 회사 정보";
                break;
            case "personnel.jobList.not-empty":
                value = "직함 정보";
                break;
            case "project.basic.not-null":
                value = "프로젝트 기본 정보";
                break;
            case "project.basic.name.not-blank":
                value = "프로젝트명";
                break;
            case "project.basic.status.not-null":
                value = "프로젝트 상태";
                break;
            case "project.basic.sales-manager-id.not-null":
                value = "영업 담장자";
                break;
            case "project.basic.project-manager-id.not-null":
                value = "담당 PM";
                break;
            case "project.building.address.not-null":
                value = "대상 주소";
                break;
            case "user.username.not-blank":
                value = "아이디";
                break;
            case "user.password.not-blank":
                value = "비밀번호";
                break;
            case "user.name.not-blank":
                value = "이름";
                break;
            case "user.email.not-blank":
                value = "이메일";
                break;
            case "user.auth-key.not-blank":
                value = "인증키";
                break;
            case "user.user-role.not-null":
                value = "권한";
                break;
            case "user.department-id.not-null":
                value = "소속 부서";
                break;
            case "user.now-password.not-blank":
                value = "현재 비밀번호";
                break;
            case "user.new-password.not-blank":
                value = "신규 비밀번호";
                break;
            case "user-verification.email.not-blank":
                value = "이메일";
                break;
            case "user-verification.name.not-blank":
                value = "이름";
                break;
            case "user-verification.department-id.not-null":
                value = "소속 부서";
                break;
            case "user-verification.user-role.not-null":
                value = "권한";
                break;
            case "address.depth1.not-blank":
                value = "시/도";
                break;
            case "address.depth2.not-blank":
                value = "시/군/구";
                break;
            case "address.road.not-blank":
                value = "도로명 주소";
                break;
            case "address.latitude.not-null":
                value = "위도";
                break;
            case "address.longitude.not-null":
                value = "경도";
                break;
            case "project-comment.project-id.not-null":
                value = "프로젝트";
                break;
            case "project-comment.description.not-blank":
                value = "메모 내용";
                break;
        }

        if (Objects.isNull(value)) {
            return null;
        }
        return String.format("%s%s%s 필수 항목입니다.",
            value,
            code.endsWith(".not-empty") ? " 하나 이상" : "",
            KoreanLetterUtil.auxiliaryPostPosition(value)
        );
    }

    private ErrorBody errorBody(MethodArgumentNotValidException e) {
        return Optional.ofNullable(e.getFieldError())
            .map(DefaultMessageSourceResolvable::getDefaultMessage)
            .map(code -> {
                String message = this.getMessage(code);

                if (Objects.isNull(message)) {
                    return new ErrorBody(
                        "system.method-argument-not-valid.field.is-null",
                        "알 수 없는 에러가 발생하였습니다."
                    );
                }
                return new ErrorBody(code, message);
            })
            .orElse(new ErrorBody(
                "system.method-argument-not-valid.field.is-null",
                "알 수 없는 에러가 발생하였습니다."
            ));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> methodArgumentNotValid(MethodArgumentNotValidException e) {
        return new ResponseEntity<>(this.errorBody(e), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> notFound(NotFoundException e) {
        return e.getResponse();
    }

    @ExceptionHandler(DuplicatedValueException.class)
    public ResponseEntity<?> duplicatedValue(DuplicatedValueException e) {
        return e.getResponse();
    }

    @ExceptionHandler(IllegalRequestException.class)
    public ResponseEntity<?> illegalRequest(IllegalRequestException e) {
        return e.getResponse();
    }

    @ExceptionHandler(CustomExceptionAdaptor.class)
    public ResponseEntity<?> exception(CustomExceptionAdaptor e) {
        return e.getResponse();
    }
}
