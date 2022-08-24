import Drawer from 'layouts/Drawer';
import React, { useState } from 'react';
import { FormikProvider } from 'formik';
import { FormikLayoutProps } from 'layouts/PageLayout';
import { ProjectMemoQuery } from 'project_memo/parameter';
import ProjectMemoForm from 'project_memo/view/Drawer/Form';
import ProjectMemoList, { ProjectMemoListProps } from 'project_memo/view/Drawer/List';

interface Props
  extends ProjectMemoListProps,
          FormikLayoutProps<ProjectMemoQuery> {
}

export default function ProjectMemoDrawer(props: Props) {

  const [open, setOpen] = useState<boolean>(true);

  return (
    <Drawer open={open} direction="right">
      <FormikProvider value={props.formik}>
        <ProjectMemoForm open={open} setOpen={setOpen} />
        <ProjectMemoList list={props.list} />
      </FormikProvider>
    </Drawer>
  );
}