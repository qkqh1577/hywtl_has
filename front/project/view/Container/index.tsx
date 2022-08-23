import PageLayout from 'layouts/PageLayout';
import React from 'react';
import ProjectContainerTitleButtonBar from 'project/view/Container/TitleButtonBar';
import ProjectStatus from 'project/view/Container/ProjectStatus';

interface Props {
  children: React.ReactNode;
  statusBar: React.ReactNode;
  title: React.ReactNode;
}

export default function ProjectContainer(props: Props) {

  return (
    <PageLayout
      title={props.title}
      titleRightComponent={<ProjectContainerTitleButtonBar />}
      filter={<ProjectStatus statusBar={props.statusBar} />}
      body={props.children}
    />
  );
}