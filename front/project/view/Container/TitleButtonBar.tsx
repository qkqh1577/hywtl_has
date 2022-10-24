import React from 'react';
import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'assets/theme';

export default function ProjectContainerTitleButtonBar() {

  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'flex-end',
      alignItems:     'center',
    }}>
      <FontAwesomeIcon
        icon="trash"
        style={{
          width:       '18px',
          height:      '18px',
          color:       ColorPalette._9bb6ea,
          marginRight: '20px'
        }}
      />
      <FontAwesomeIcon
        icon="star"
        style={{
          width:  '18px',
          height: '18px',
          color:  ColorPalette._386dd6,
        }}
      />
    </Box>
  );
}