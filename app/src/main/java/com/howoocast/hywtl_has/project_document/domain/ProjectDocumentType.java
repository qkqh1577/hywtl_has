package com.howoocast.hywtl_has.project_document.domain;

/**
 * 자료 종류
 */
public enum ProjectDocumentType {

    /**
     * 받은 자료
     */
    RECEIVED("받은 자료"),
    /**
     * 보낸 자료
     */
    SENT("보낸 자료"),
    /**
     * 형상비 검토 자료
     */
    BUILDING("형상비 검토 자료");

    private final String name;

    ProjectDocumentType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
