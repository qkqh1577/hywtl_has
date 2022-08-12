import PageLayout from 'layouts/PageLayout';
import ProjectStatusBar, { ProjectStatusBarProps } from 'project/view/Container/Status';

interface Props {
  projectStatusBarProps: ProjectStatusBarProps;
}

export default function ProjectContainer(props: Props) {

  return (
    <PageLayout
      filter={<ProjectStatusBar {...props.projectStatusBarProps} />}
      body={
        <div>test</div>
      }
    />
  );
}