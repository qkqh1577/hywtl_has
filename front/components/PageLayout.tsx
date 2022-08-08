import React from 'react';
import {
  Box,
  Paper
} from '@mui/material';
import Title, { TitleProps } from 'components/Title';
import {
  Form,
  Formik,
  FormikConfig,
} from 'formik';

interface PageLayoutProps
  extends TitleProps {
  body: React.ReactNode;
  footer?: React.ReactNode;
  modifiedAt?: Date | null;
  modals?: JSX.Element | JSX.Element[];
}

interface SearchPageLayoutProps
  extends PageLayoutProps {
  filter: React.ReactNode;
}

interface FormikLayoutProps<T>
  extends PageLayoutProps {
  formik: FormikConfig<T>;
}


export default function PageLayout<T>(props: PageLayoutProps | SearchPageLayoutProps | FormikLayoutProps<T>) {

  function isFormikForm(props: PageLayoutProps): props is FormikLayoutProps<T> {
    return typeof (props as any).formik !== 'undefined';
  }

  function isSearchForm(props: PageLayoutProps): props is SearchPageLayoutProps {
    return typeof (props as any).filter !== 'undefined';
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
      {isFormikForm(props) && (
        <Formik {...props.formik}>
          <Form>
            <PageContent {...props} />
          </Form>
        </Formik>
      )}
      {!isFormikForm(props) && (
        <PageContent {...props} />
      )}
      {modals}
    </Paper>
  );
};

function PageContent({
                       body,
                       footer
                     }: Pick<PageLayoutProps, | 'body' | 'footer'>) {
  return (
    <>
      <Box
        children={body}
        sx={{
          display: 'flex',
          width:   '100%',
          mb:      '40px',
        }}
      />
      {footer && (
        <Box
          children={footer}
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
