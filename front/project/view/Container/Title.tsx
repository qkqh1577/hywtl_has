import React from 'react';
import { Box } from '@mui/material';
import TextBox from 'layouts/Text';

interface Props {
  code?: string;
  name?: string;
}

export default function ProjectContainerTitle({ name, code }: Props) {
  return (
    <Box sx={{
      display: 'flex',
      width:   '100%',
      height:  '100%'
    }}>
      <TextBox variant="heading1">
        {name && '['}
        {name && !code ? '가등록' : code}
        {name && ']'}
      </TextBox>
      <TextBox variant="heading1">
        {name}
      </TextBox>
    </Box>
  );
}