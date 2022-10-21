import Drawer from 'layouts/Drawer';
import React, { useRef } from 'react';
import { FormikLayoutProps } from 'layouts/PageLayout';
import {
  Form,
  FormikProvider
} from 'formik';
import SearchForm, { SearchFormProps } from 'app/view/App/ProjectDrawer/SearchForm';
import List, { ListProps } from 'app/view/App/ProjectDrawer/List';
import { ColorPalette } from 'app/view/App/theme';
import { ProjectQuery } from 'project/parameter';

export interface ProjectDrawerProps
  extends Omit<SearchFormProps & ListProps, |'searchFormRef'>,
          FormikLayoutProps<ProjectQuery> {
}

export default function ProjectDrawer(props: ProjectDrawerProps) {

  const searchFormRef = useRef<HTMLDivElement>(null);

  return (
    <Drawer
      open={props.openMenu}
      openedWidth={310}
      sx={{
        backgroundColor: ColorPalette._f1f5fc,
      }}>
      <FormikProvider value={props.formik}>
        <Form>
          <SearchForm {...props} searchFormRef={searchFormRef} />
        </Form>
      </FormikProvider>
      <List {...props} searchFormRef={searchFormRef} />
    </Drawer>
  );
}