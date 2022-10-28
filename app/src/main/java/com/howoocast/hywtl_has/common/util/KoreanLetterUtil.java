package com.howoocast.hywtl_has.common.util;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import javax.validation.constraints.NotBlank;

public final class KoreanLetterUtil {

    public static final List<String> alphabet_list = Arrays.asList(
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    );

    public static String toUnicode(String text) {
        if (Objects.isNull(text)) {
            return null;
        }
        if (text.isEmpty()) {
            return "";
        }
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < text.length(); i++) {
            char lastLetter = text.charAt(text.length() - 1);
            String hex = Integer.toHexString(lastLetter | 0x10000).substring(1).toUpperCase();
            builder.append("\\u");
            builder.append(hex);
        }
        return builder.toString();
    }

    public static Boolean hasFinalConsonant(@NotBlank String text) {
        char lastLetter = text.charAt(text.length() - 1);
        String hex = Integer.toHexString(lastLetter | 0x10000).substring(1).toUpperCase();
        int unicode = Integer.parseInt(hex, 16);
        if (unicode < 44032 || unicode > 55203) {
            return null;
        }
        return (unicode - 44032) % 28 != 0;
    }

    public static String objectPostPosition(String text) {
        Boolean result = hasFinalConsonant(text);
        if (Objects.isNull(result)) {
            return "";
        }
        return result ? "을" : "를";
    }

    public static String subjectPostPosition(String text) {
        Boolean result = hasFinalConsonant(text);
        if (Objects.isNull(result)) {
            return "";
        }
        return result ? "이" : "가";
    }

    public static String auxiliaryPostPosition(String text) {
        Boolean result = hasFinalConsonant(text);
        if (Objects.isNull(result)) {
            return "";
        }
        return result ? "은" : "는";
    }

    public static boolean hasAlphabet(String text) {
        for (int i = 0; i < text.length() - 1; i++) {
            String letter = text.substring(i, i + 1);
            if (alphabet_list.contains(letter)) {
                return true;
            }

        }
        return false;
    }

}
