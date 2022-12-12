import TextBox from 'layouts/Text';
import { Box } from '@mui/material';
import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
  width?: string;
  onClick?: () => void;
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
    }}
      onClick={props.onClick}
    >
      <TextBox variant="body8" sx={{
        marginBottom: '5px',
        cursor:       `${props.onClick ? 'pointer' : 'default'}`
      }}>
        {props.title}
      </TextBox>
      {props.children}
    </Box>
  );
}
