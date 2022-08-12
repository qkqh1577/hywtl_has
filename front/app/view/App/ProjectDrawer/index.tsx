import Drawer from 'layouts/Drawer';
import React from 'react';
import { FormikLayoutProps } from 'components/PageLayout';
import { ProjectQuery } from 'project/query';
import {
  Form,
  FormikProvider
} from 'formik';
import SearchForm, { SearchFormProps } from 'app/view/App/ProjectDrawer/SearchForm';
import List, { ListProps } from 'app/view/App/ProjectDrawer/List';

export interface ProjectDrawerProps
  extends SearchFormProps,
          ListProps,
          FormikLayoutProps<ProjectQuery> {
  toggleMenu: () => void;
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