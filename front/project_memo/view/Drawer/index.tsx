import Drawer from 'layouts/Drawer';
import React, { useState } from 'react';
import { FormikProvider } from 'formik';
import { FormikLayoutProps } from 'layouts/PageLayout';
import { ProjectMemoQuery } from 'project_memo/parameter';
import { Button } from '@mui/material';

interface Props
  extends FormikLayoutProps<ProjectMemoQuery> {

}

export default function ProjectMemoDrawer(props: Props) {

  const [open, setOpen] = useState<boolean>(true);

  return (
    <Drawer open={open} direction="right">
      <FormikProvider value={props.formik}>
        <Button onClick={() => {
          setOpen(!open);
        }}>
          close
        </Button>
      </FormikProvider>
    </Drawer>
  );
}