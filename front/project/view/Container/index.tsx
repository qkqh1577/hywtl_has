import PageLayout from 'layouts/PageLayout';
import React from 'react';
import ProjectContainerTitleButtonBar from 'project/view/Container/TitleButtonBar';
import ProjectContainerHeader from 'project/view/Container/Header';

interface Props {
  children: React.ReactNode;
  status: React.ReactNode;
  title: React.ReactNode;
}

export default function ProjectContainer(props: Props) {

  return (
    <PageLayout
      title={props.title}
      titleRightComponent={<ProjectContainerTitleButtonBar />}
      filter={<ProjectContainerHeader status={props.status} />}
      body={props.children}
    />
  );
}
