package com.howoocast.hywtl_has.common.controller;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;
import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor.ErrorBody;
import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.util.Dictionary;
import com.howoocast.hywtl_has.common.util.KoreanLetterUtil;
import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.NoHandlerFoundException;

@Slf4j
@ControllerAdvice
public class ExceptionController {

    private final Dictionary dictionary = new Dictionary();

    private String getMessage(final String code) {

        String[] split = code.split("\\.");
        String errorType = split[split.length - 1];
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < split.length - 1; i++) {
            builder.append(split[i]);
            if (i < split.length - 2) {
                builder.append(".");
            }
        }

        String message = builder.toString();

        Set<String> keySet = dictionary.keySet();
        Set<String> nextSet = new HashSet<>();

        for (String key : keySet) {
            if (key.contains(".")) {
                if (message.contains(key)) {
                    message = message.replace(key, dictionary.get(key));
                }
            } else {
                nextSet.add(key);
            }
        }

        keySet = nextSet;
        nextSet = new HashSet<>();
        message = message.replace(".", " ");
        for (String key : keySet) {
            if (key.contains("_")) {
                if (message.contains(key)) {
                    message = message.replace(key, dictionary.get(key));
                }
            } else {
                nextSet.add(key);
            }
        }

        keySet = nextSet;
        message = message.replace("_", " ");
        for (String key : keySet) {
            if (message.contains(key)) {
                message = message.replace(key, dictionary.get(key));
            }
        }
        return String.format("%s%s %s 항목입니다.",
            message,
            KoreanLetterUtil.auxiliaryPostPosition(message),
            dictionary.get(errorType)
        );
    }

    private ErrorBody errorBody(BindException e) {
        return Optional.ofNullable(e.getFieldError())
            .map(DefaultMessageSourceResolvable::getDefaultMessage)
            .map(code -> {
                String message = this.getMessage(code);

                if (Objects.isNull(message)) {
                    e.printStackTrace();
                    return new ErrorBody(
                        "system.method_argument_not_valid.field.is_null",
                        "알 수 없는 에러가 발생하였습니다."
                    );
                }
                return new ErrorBody(code, message);
            })
            .orElseGet(() -> {
                e.printStackTrace();
                return new ErrorBody(
                    "system.method_argument_not_valid.field.is_null",
                    "알 수 없는 에러가 발생하였습니다."
                );
            });
    }

    @ResponseBody
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> methodArgumentNotValid(MethodArgumentNotValidException e) {
        ErrorBody error = this.errorBody(e);
        log.error("[Not Valid] code: {}, message: {}", error.getCode(), error.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ResponseBody
    @ExceptionHandler(BindException.class)
    public ResponseEntity<?> bind(BindException e) {
        ErrorBody error = this.errorBody(e);
        log.error("[Not Valid] code: {}, message: {}", error.getCode(), error.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ResponseBody
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> notFound(NotFoundException e) {
        return e.getResponse();
    }

    @ResponseBody
    @ExceptionHandler(DuplicatedValueException.class)
    public ResponseEntity<?> duplicatedValue(DuplicatedValueException e) {
        return e.getResponse();
    }

    @ResponseBody
    @ExceptionHandler(IllegalRequestException.class)
    public ResponseEntity<?> illegalRequest(IllegalRequestException e) {
        return e.getResponse();
    }

    @ResponseBody
    @ExceptionHandler(CustomExceptionAdaptor.class)
    public ResponseEntity<?> exception(CustomExceptionAdaptor e) {
        return e.getResponse();
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ModelAndView error404() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("index");
        return mav;
    }


}
