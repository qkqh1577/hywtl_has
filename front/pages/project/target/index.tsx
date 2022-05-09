import React from 'react';
import ProjectTargetDetail from 'pages/project/target/Target';
import ProjectTargetReviewList from 'pages/project/target/ReviewList';
import ProjectTargetReviewModal from 'pages/project/target/ReviewModal';

const ProjectTargetContainer = () => (
  <>
    <ProjectTargetDetail />
    <ProjectTargetReviewList />
    <ProjectTargetReviewModal />
  </>
);

export default ProjectTargetContainer;
