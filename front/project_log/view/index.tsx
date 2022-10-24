import React from 'react';
import LogTable, { ListProps } from 'project_log/view/LogTable';
import SearchSection from 'project_log/view/SearchSection';
import Footer, { FooterProps } from 'project_log/view/Footer';
import { Box } from '@mui/material';
import { ColorPalette } from 'assets/theme';

interface Props
  extends ListProps,
          FooterProps {}

export default function ProjectLog(props: Props) {
  return (
    <Box sx={{
      display:      'flex',
      width:        '100%',
      flexWrap:     'wrap',
      alignContent: 'flex-start',
      flex:         1,
    }}>
      <Box sx={{
        display:      'flex',
        width:        '100%',
        flexWrap:     'nowrap',
        border:       `1px solid ${ColorPalette._e4e9f2}`,
        borderRadius: '5px',
        marginBottom: '15px',
        padding: '15px 15px'
      }}>
        <SearchSection totalElements={props.page?.totalElements ?? 0} />
      </Box>
      <LogTable {...props} />
      <Footer {...props} />
    </Box>
  );
};
