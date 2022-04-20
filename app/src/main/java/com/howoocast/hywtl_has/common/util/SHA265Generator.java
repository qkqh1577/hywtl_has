package com.howoocast.hywtl_has.common.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import javax.validation.constraints.NotBlank;

public final class SHA265Generator {

    /**
     * 전환 전, 입력 값을 UTF-8 byte 배열로 처리
     * 출력의 모든 영문자는 대문자로 처리
     *
     * @param rawText not blank
     * @return SHA-256 으로 전환된 문자열
     * @author young
     */
    public static String make(@NotBlank final String rawText) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(rawText.getBytes(StandardCharsets.UTF_8));
        StringBuilder builder = new StringBuilder();
        byte[] encrypted = md.digest();
        for (byte b : encrypted) {
            builder.append(String.format("%02x", b));
        }
        return builder.toString().toLowerCase();
    }
}
