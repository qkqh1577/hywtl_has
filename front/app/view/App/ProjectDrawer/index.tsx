import Drawer from 'layouts/Drawer';
import React from 'react';
import { FormikLayoutProps } from 'layouts/PageLayout';
import { ProjectQuery } from 'project/query';
import {
  Form,
  FormikProvider
} from 'formik';
import SearchForm, { SearchFormProps } from 'app/view/App/ProjectDrawer/SearchForm';
import List, { ListProps } from 'app/view/App/ProjectDrawer/List';
import { ProjectAppBarProps } from 'app/view/App/ProjectDrawer/AppBar';

export interface ProjectDrawerProps
  extends SearchFormProps,
          ListProps,
          ProjectAppBarProps,
          FormikLayoutProps<ProjectQuery> {
}

export default function ProjectDrawer(props: ProjectDrawerProps) {

  return (
    <Drawer open={props.openMenu} openedWidth={340}>
      <FormikProvider value={props.formik}>
        <Form>
          <SearchForm {...props} />
        </Form>
      </FormikProvider>
      <List {...props} />
    </Drawer>
  );
}