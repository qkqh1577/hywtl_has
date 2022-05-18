import React from 'react';
import ProjectTargetReviewList from 'pages/project/target/ReviewList';
import ProjectTargetReviewModal from 'pages/project/target/ReviewModal';
import ProjectTargetDocumentList from 'pages/project/target/DocumentList';
import ProjectTargetDocumentModal from 'pages/project/target/DocumentModal';

const ProjectTargetContainer = () => (
  <>
    <ProjectTargetReviewList />
    <ProjectTargetDocumentList />
    <ProjectTargetReviewModal />
    <ProjectTargetDocumentModal />
  </>
);

export default ProjectTargetContainer;
