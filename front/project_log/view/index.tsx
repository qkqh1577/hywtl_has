import React from 'react';
import LogTable, { ListProps } from 'project_log/view/LogTable';
import SearchSection from 'project_log/view/SearchSection';
import Footer, { FooterProps } from 'project_log/view/Footer';
import { Box } from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';

interface Props
  extends ListProps,
          FooterProps {}

export default function ProjectLog(props: Props) {
  return (
      <>
        <Box sx={{
          display:      'flex',
          width:        '100%',
          padding:      '15px 20px',
          border:       `1px solid ${ColorPalette._e4e9f2}`,
          borderRadius: '5px',
          marginBottom: '20px',
        }}>
          <SearchSection totalCount={props.page?.content.length}/>
        </Box>
        <LogTable {...props} />
        <Footer {...props} />
      </>
  );
};
