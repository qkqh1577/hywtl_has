package com.howoocast.hywtl_has.rival_bid.controller;

import com.howoocast.hywtl_has.rival_bid.parameter.RivalBidParameter;
import com.howoocast.hywtl_has.rival_bid.service.RivalBidService;
import com.howoocast.hywtl_has.rival_bid.view.RivalBidView;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class RivalBidController {

    private final RivalBidService service;

    @GetMapping("/project/sales/{projectId}/rival-bid")
    public List<RivalBidView> getList(
        @PathVariable Long projectId
    ) {
        return service.getList(projectId).stream().map(RivalBidView::assemble).collect(Collectors.toList());
    }

    @PostMapping("/project/sales/{projectId}/rival-bid")
    public void push(
        @PathVariable Long projectId
    ) {
        service.push(projectId);
    }

    @PatchMapping("/project/sales/rival-bid/{id}")
    public void update(
        @PathVariable Long id,
        @Valid @RequestBody RivalBidParameter parameter
    ) {
        service.update(id, parameter);
    }

    @DeleteMapping("/project/sales/rival-bid/{id}")
    public void delete(
        @PathVariable Long id
    ) {
        service.delete(id);
    }

}
