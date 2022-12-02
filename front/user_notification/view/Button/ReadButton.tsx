import {
  Box,
  Tooltip
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'assets/theme';
import React from 'react';

interface Props {
  onClick: () => void;
}

export default function ReadButton(props: Props) {
  const {
          onClick,
        } = props;
  return (
    <Box sx={{
      marginRight: '5px'
    }}>
      <Tooltip title='읽음 표시'>
        <FontAwesomeIcon
          style={{
            color:  ColorPalette._386dd6,
            cursor: 'pointer',
          }}
          icon={['fab', 'readme']}
          onClick={onClick}
        />
      </Tooltip>
    </Box>
  );
}
