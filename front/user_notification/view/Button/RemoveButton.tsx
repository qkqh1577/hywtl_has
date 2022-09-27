import React from 'react';
import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'app/view/App/theme';

export default function RemoveButton(props) {
  return (
    <Box sx={{
      marginRight: '5px'
    }}>
      <FontAwesomeIcon
        style={{
          color:  ColorPalette._9bb6ea,
          cursor: 'pointer'
        }}
        icon="trash"
        onClick={props.onClick}
      />
    </Box>
  );
}
