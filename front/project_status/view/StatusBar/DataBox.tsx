import TextBox from 'layouts/Text';
import { Box } from '@mui/material';
import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
  width?: string;
}

export default function DataBox(props: Props) {

  return (
    <Box sx={{
      display:       'flex',
      flexWrap:      'wrap',
      flexDirection: 'column',
      alignContent:  'stretch',
      alignItems:    'center',
      padding:       '10px',
      borderRadius:  '5px',
      boxSizing:     'border-box',
      width:         props.width ?? '120px',
    }}>
      <TextBox variant="body8" sx={{ marginBottom: '5px' }}>
        {props.title}
      </TextBox>
      {props.children}
    </Box>
  );
}