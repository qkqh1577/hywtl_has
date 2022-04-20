package com.howoocast.hywtl_has.common.controller;

import com.howoocast.hywtl_has.common.service.FileItemService;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

@Slf4j
@RestController
@RequiredArgsConstructor
public class FileController {

    private final FileItemService fileItemService;

    @GetMapping("/file-items/{id}")
    public void downloadById(@PathVariable Long id, HttpServletResponse response) throws Exception {
        fileItemService.get(id).download(response);
    }

    @GetMapping(value = "/file-items", params = "fileKey")
    public void downloadByFileKey(@RequestParam String fileKey, HttpServletResponse response) throws Exception {
        fileItemService.getByFileKey(fileKey).download(response);
    }

    @GetMapping("/file-items/{id}/streaming")
    public StreamingResponseBody streamingById(@PathVariable Long id) throws Exception {
        return fileItemService.get(id).streaming();
    }

    @GetMapping(value = "/file-items/streaming", params = "fileKey")
    public StreamingResponseBody streamingByFileKey(@RequestParam String fileKey) throws Exception {
        return fileItemService.getByFileKey(fileKey).streaming();
    }
}
