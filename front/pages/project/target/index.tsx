import React from 'react';
import ProjectTargetDetail from 'pages/project/target/Target';
import ProjectTargetReviewList from 'pages/project/target/ReviewList';
import ProjectTargetReviewModal from 'pages/project/target/ReviewModal';
import ProjectTargetDocumentList from 'pages/project/target/DocumentList';
import ProjectTargetDocumentModal from 'pages/project/target/DocumentModal';

const ProjectTargetContainer = () => (
  <>
    <ProjectTargetDetail />
    <ProjectTargetReviewList />
    <ProjectTargetDocumentList />
    <ProjectTargetReviewModal />
    <ProjectTargetDocumentModal />
  </>
);

export default ProjectTargetContainer;
