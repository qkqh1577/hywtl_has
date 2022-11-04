package com.howoocast.hywtl_has.file.controller;

import com.howoocast.hywtl_has.file.service.FileItemService;
import java.io.File;
import java.io.FileNotFoundException;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
    private final ResourceLoader resourceLoader;

    @GetMapping("/file-item/{id}")
    public void downloadById(@PathVariable Long id, HttpServletResponse response) throws Exception {
        fileItemService.get(id).download(response);
    }

    @GetMapping(value = "/file-item", params = "fileKey")
    public void downloadByFileKey(@RequestParam String fileKey, HttpServletResponse response) throws Exception {
        fileItemService.getByFileKey(fileKey).download(response);
    }

    @GetMapping("/file-item/{id}/streaming")
    public StreamingResponseBody streamingById(@PathVariable Long id) throws Exception {
        return fileItemService.get(id).streaming();
    }

    @GetMapping(value = "/file-item/streaming", params = "fileKey")
    public StreamingResponseBody streamingByFileKey(@RequestParam String fileKey) throws Exception {
        return fileItemService.getByFileKey(fileKey).streaming();
    }

    @GetMapping(value = "/file-item",params = "projectEstimateId")
    public void downloadByProjectEstimateId(@RequestParam Long projectEstimateId, HttpServletResponse response) throws Exception {
        fileItemService.getByProjectEstimateId(projectEstimateId).download(response);
    }

    @GetMapping(value= "/file-item",params = {"projectContractId", "type"})
    public void downloadByProjectContractId(
        @RequestParam Long projectContractId,
        @RequestParam(required = false) String type,
        HttpServletResponse response) throws Exception {
        fileItemService.getByProjectContractId(projectContractId, type).download(response);
    }

    /* pdf 변환 작업 */
    /* static file down load api */
    @GetMapping(value = "/file-item/template", params = "fileName")
    public ResponseEntity<Resource> downloadTemplate(@RequestParam String fileName) throws Exception {
        try {
            Resource resource = resourceLoader.getResource("classpath:static/files/" + fileName);
            File file = resource.getFile();
            return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, file.getName())
                .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(file.length()))
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM.toString())
                .body(resource);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
//    /* conversion */
//    @PostMapping("/file-item/conversion")
//    public void convertToPDF(@ModelAttribute MultipartFile multipartFile) {
//        try {
//            fileItemService.convertToPDF(multipartFile);
//        } catch (FileNotFoundException e) {
//            throw new RuntimeException(e);
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//    }
}
