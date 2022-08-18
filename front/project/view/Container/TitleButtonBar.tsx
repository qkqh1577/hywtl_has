import React from 'react';
import { Box } from '@mui/material';
import {
  Delete as DeleteIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import IconButton from 'components/IconButton';

export default function ProjectContainerTitleButtonBar() {

  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'flex-end',
    }}>
      <IconButton children={<DeleteIcon />} onClick={() => {}} />
      <IconButton children={<StarIcon />} onClick={() => {}} />
    </Box>
  );
}