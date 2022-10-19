package com.howoocast.hywtl_has.common.util;

import java.text.NumberFormat;
import java.util.List;
import org.springframework.lang.Nullable;

public final class NumberUtil {

    public static String toLocaleString(@Nullable Number number) {
        NumberFormat numberFormat = NumberFormat.getNumberInstance();
        return numberFormat.format(number);
    }

    public static Long toLong(String localeString) {
        if (localeString.contains(".")) {
            throw new NumberFormatException();
        }
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < localeString.length(); i++) {
            String letter = localeString.substring(i, i + 1);
            if (letter.equals("-") && i == 0) {
                builder.append(letter);
                continue;
            }
            try {
                Integer.parseInt(letter);
                builder.append(letter);
            } catch (Exception e) {
                // NOTHING TO DO
            }
        }
        return Long.parseLong(builder.toString());
    }

    public static Double toDouble(String localeString) {
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < localeString.length(); i++) {
            String letter = localeString.substring(i, i + 1);
            if (letter.equals("-") && i == 0) {
                builder.append(letter);
                continue;
            }
            if (letter.equals(".")) {
                builder.append(letter);
                continue;
            }
            try {
                Integer.parseInt(letter);
                builder.append(letter);
            } catch (Exception e) {
                // NOTHING TO DO
            }
        }
        return Double.parseDouble(builder.toString());
    }

    public static String toAmountKor(Long amount) {
        if (amount <= 0) {
            return "";
        }
        List<String> counter = List.of("영", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구");
        List<String> splitter = List.of("", "십", "백", "천");
        List<String> unit = List.of("", "만", "억", "조", "경", "해");
        boolean breaker = false;
        String builder = "";

        String amountText = String.format("%d", amount);

        for (int i = 0; i < unit.size(); i++) {
            boolean unitUsed = false;

            for (int j = 0; j < splitter.size(); j++) {
                int index = i * splitter.size() + j;
                if (index == amountText.length()) {
                    breaker = true;
                    break;
                }
                int substrIndex = amountText.length() - 1 - index;
                String letter = amountText.substring(substrIndex, substrIndex + 1);
                if (letter.equals("0")) {
                    continue;
                }
                int letterNum = Integer.parseInt(letter);
                String str = counter.get(letterNum);
                str += splitter.get(j);
                if (!unitUsed) {
                    str += unit.get(i);
                    unitUsed = true;
                }
                builder = str + builder;
            }
            if (breaker) {
                break;
            }
        }
        return String.format("일금%s원정", builder);
    }
}
