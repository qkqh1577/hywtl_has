import React from 'react';
import ProjectReviewList from 'pages/project/target/ReviewList';
import ProjectReviewModal from 'pages/project/target/ReviewModal';
import ProjectTargetDocumentList from 'pages/project/target/DocumentList';
import ProjectTargetDocumentModal from 'pages/project/target/DocumentModal';

const ProjectTargetContainer = () => (
  <>
    <ProjectReviewList />
    <ProjectTargetDocumentList />
    <ProjectReviewModal />
    <ProjectTargetDocumentModal />
  </>
);

export default ProjectTargetContainer;
