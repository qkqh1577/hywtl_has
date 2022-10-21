package com.howoocast.hywtl_has.project.domain;

/**
 * 입찰 상태
 */
public enum ProjectBidStatus {
    /**
     * 대기
     */
    WAITING("대기"),
    /**
     * 입찰
     */
    BID("입찰"),
    /**
     * 미입찰
     */
    HOLD("미입찰"),
    /**
     *
     */
    WIN("낙찰 성공"),
    /**
     *
     */
    LOSE("낙찰 실패"),
    /**
     *
     */
    CONTRAST("대비 입찰");

    private final String name;

    ProjectBidStatus(final String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
