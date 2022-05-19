package com.howoocast.hywtl_has.business.common;

import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public enum BusinessManagerStatus {
  IN_OFFICE("재직"),
  RESIGNATION("퇴사"),
  LEAVE("휴직");

  private final String message;

  public String message() {
    return this.message;
  }

  public final List<String> getAllMessage() {
    return Arrays.stream(BusinessManagerStatus.values()).map(BusinessManagerStatus::message).collect(Collectors.toList());
  }
}