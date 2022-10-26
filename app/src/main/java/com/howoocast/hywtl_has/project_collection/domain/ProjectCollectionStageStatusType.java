package com.howoocast.hywtl_has.project_collection.domain;

/**
 * 프로젝트 수금 현황 구분
 */
public enum ProjectCollectionStageStatusType {
    ASKED("청구"),
    COLLECTED("수금"),
    CARRYOVER("이월");

    private final String name;

    ProjectCollectionStageStatusType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
