package com.howoocast.hywtl_has.file_conversion_history.common;
/**
 * poc 파일 상태 관리
 */
public enum FileState {
    /**
     * 대기
     */
    WAITING,

    /**
     * 진행중
     */
    IN_PROGRESS,

    /**
     * 완료
     */
    COMPLETE,

    /**
     * 실패
     */
    FAIL
}
