import React from 'react';
import {
  Box,
  Tooltip
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'assets/theme';

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
      <Tooltip title="삭제">
        <FontAwesomeIcon
          style={{
            color:  ColorPalette._9bb6ea,
            cursor: 'pointer',
          }}
          icon="trash"
          onClick={onClick}
        />
      </Tooltip>
    </Box>
  );
}
