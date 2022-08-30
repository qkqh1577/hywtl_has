package com.howoocast.hywtl_has.project.document.controller;

import com.howoocast.hywtl_has.project.document.domain.ProjectDocument;
import com.howoocast.hywtl_has.project.document.view.ProjectDocumentShortView;
import com.howoocast.hywtl_has.project.document.view.ProjectDocumentView;
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
