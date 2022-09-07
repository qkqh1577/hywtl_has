package com.howoocast.hywtl_has.project_document.controller;

import com.howoocast.hywtl_has.project_document.domain.ProjectDocument;
import com.howoocast.hywtl_has.project_document.view.ProjectDocumentShortView;
import com.howoocast.hywtl_has.project_document.view.ProjectDocumentView;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectDocumentMapper {


    public static List<ProjectDocumentShortView> toShort(List<ProjectDocument> source) {
        return source.stream().map(ProjectDocumentShortView::assemble).collect(Collectors.toList());
    }

    public static ProjectDocumentView toView(ProjectDocument source) {
        return ProjectDocumentView.assemble(source);
    }

}
