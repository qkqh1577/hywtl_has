import React from 'react';
import { Box } from '@mui/material';
import TextField from 'components/TextField';
import IconButton from 'components/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      padding:        '15px 10px 0 10px',
      flexWrap:       'nowrap',
      alignItems:     'center',
    }}>
      <TextField
        disableLabel
        name="keyword"
        label="프로젝트명 검색"
        placeholder="프로젝트명, 단지 명, ..."
      />
      <IconButton
        onClick={props.toggleFilter}
        children={<FontAwesomeIcon icon={props.openFilter ? 'angle-up' : 'angle-down'} />}
      />
    </Box>
  );
}