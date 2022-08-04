import React from 'react';
import {
  Box,
  Paper
} from '@mui/material';
import Title, { TitleProps } from 'components/Title';

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

function isSearchForm(props: PageLayoutProps): props is SearchPageLayoutProps {
  return typeof (props as any).filter !== 'undefined';
}

export default function PageLayout(props: PageLayoutProps | SearchPageLayoutProps) {
  const {
          title,
          titleRightComponent,
          body,
          footer,
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
      {modals}
    </Paper>
  );
};
