import React from 'react';
import { Box } from '@mui/material';
import TextField from 'components/TextField';
import IconButton from 'components/IconButton';
import {
  ArrowUpward as UpIcon,
  ArrowDownward as DownIcon,
} from '@mui/icons-material';

export interface SearchFormProps {
  openFilter: boolean;
  toggleFilter: () => void;
}

export default function (props: SearchFormProps) {

  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      overflowX:      'hidden',
      justifyContent: 'space-between',
      padding:        '4px'
    }}>
      <TextField
        name="name"
        label="프로젝트명 검색"
      />
      <IconButton onClick={props.toggleFilter}>
        {props.openFilter ? <UpIcon /> : <DownIcon />}
      </IconButton>
    </Box>
  );
}