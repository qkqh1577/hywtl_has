package com.howoocast.hywtl_has.common.util;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

@Slf4j
public class TestChar {

    @Test
    void testLetter() {

        String raw = "김";
        String hex = Integer.toHexString(raw.charAt(0) | 0x10000).substring(1);
        int decimal = Integer.parseInt(hex, 16);
        log.debug("[test] raw: {}", raw);
        log.debug("[test] hex: {}", hex);
        log.debug("[test] decimal: {}", decimal);
    }
}
