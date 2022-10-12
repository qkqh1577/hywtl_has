import React from 'react';
import { Box } from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import Plan from './Plan';
import Amount from './Amount';
import TemplateList from './TemplateList';
import ContentList from './ContentList';

export default function ProjectSystemEstimateModalRightForm() {

  return (
    <Box sx={{
      width:                        '60%',
      display:                      'flex',
      flexWrap:                     'wrap',
      alignContent:                 'flex-start',
      height:                       '100%',
      padding:                      '10px',
      overflowY:                    'scroll',
      overflowX:                    'hidden',
      '&::-webkit-scrollbar':       {
        width:           '10px',
        height:          '10px',
        backgroundColor: ColorPalette._e4e9f2,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: ColorPalette._697183,
      }
    }}>
      <Plan />
      <Amount />
      <TemplateList />
      <ContentList />
    </Box>
  );
}