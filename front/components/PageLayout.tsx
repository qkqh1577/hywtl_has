import React from 'react';
import {
  Box,
  Paper
} from '@mui/material';
import Title, { TitleProps } from 'components/Title';
import {
  Form,
  FormikContextType,
  FormikProvider,
} from 'formik';

export interface PageLayoutProps
  extends TitleProps {
  body: React.ReactNode;
  footer?: React.ReactNode;
  modifiedAt?: Date | null;
  modals?: JSX.Element | JSX.Element[];
}

export interface SearchPageLayoutProps
  extends PageLayoutProps {
  filter: React.ReactNode;
}

export interface FormikLayoutProps<T>
  extends PageLayoutProps {
  formik: FormikContextType<T>;
}


export default function PageLayout<T>(props: PageLayoutProps | SearchPageLayoutProps | FormikLayoutProps<T>) {

  function isFormikForm(props: PageLayoutProps): props is FormikLayoutProps<T> {
    return typeof (props as any).formik !== 'undefined';
  }

  const {
          title,
          titleRightComponent,
          modals,
        } = props;
  return (
    <Paper sx={{
      width:    '100%',
      overflow: 'hidden'
    }}>
      <Title title={title} titleRightComponent={titleRightComponent} />
      {isFormikForm(props) && (
        <FormikProvider value={props.formik}>
          <Form>
            <PageContent {...props} />
          </Form>
        </FormikProvider>
      )}
      {!isFormikForm(props) && (
        <PageContent {...props} />
      )}
      {modals}
    </Paper>
  );
};

function PageContent(props: PageLayoutProps) {
  function isSearchForm(props: PageLayoutProps): props is SearchPageLayoutProps {
    return typeof (props as any).filter !== 'undefined';
  }

  return (
    <>
      {isSearchForm(props) && (
        <Box
          children={props.filter}
          sx={{
            display: 'flex',
            width:   '100%',
            mb:      '40px',
          }}
        />
      )}
      <Box
        children={props.body}
        sx={{
          display: 'flex',
          width:   '100%',
          mb:      '40px',
        }}
      />
      {props.footer && (
        <Box
          children={props.footer}
          sx={{
            display: 'flex',
            width:   '100%',
            mb:      '40px',
          }}
        />
      )}
    </>
  );
}
