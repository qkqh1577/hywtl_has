import React from 'react';
import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'app/view/App/theme';

interface Props {
  onClick: () => void;
}

export default function RemoveButton(props: Props) {
  const {
          onClick,
        } = props;
  return (
    <Box sx={{
      marginRight: '5px'
    }}>
      <FontAwesomeIcon
        style={{
          color:  ColorPalette._9bb6ea,
          cursor: 'pointer',
        }}
        icon="trash"
        onClick={onClick}
      />
    </Box>
  );
}
