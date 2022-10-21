import TextBox from 'layouts/Text';
import { Box } from '@mui/material';
import React from 'react';

interface Props {
  title: string;
  width: number;
  children: React.ReactNode;
  backgroundColor: string;
}

export default function DataBox(props: Props) {

  return (
    <Box sx={{
      display:         'flex',
      flexWrap:        'wrap',
      flexDirection:   'column',
      alignContent:    'stretch',
      alignItems:      'center',
      backgroundColor: props.backgroundColor,
      padding:         '10px',
      borderRadius:    '5px',
      flex:            1,
    }}>
      <TextBox variant="body8" sx={{ marginBottom: '5px' }}>
        {props.title}
      </TextBox>
      {props.children}
    </Box>
  );
}