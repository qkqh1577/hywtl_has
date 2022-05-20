package com.howoocast.hywtl_has.business.common;

public enum BusinessManagerStatus {
  IN_OFFICE("재직"),
  RESIGNATION("퇴사"),
  LEAVE("휴직");

  private final String value;

  BusinessManagerStatus(final String value) { this.value = value; }

  public final String value() { return value; }
}