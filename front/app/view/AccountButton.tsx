import Tooltip from 'components/Tooltip';
import React from 'react';
import { DefaultFunction } from 'type/Function';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'assets/theme';
import { IconButton } from '@mui/material';

interface Props {
  openModal: DefaultFunction;
}

export default function ({ openModal }: Props) {
  return (
    <Tooltip title="계정 정보" placement="bottom">
      <IconButton
        onClick={openModal}
        sx={{
          backgroundColor: ColorPalette._697183,
          width:           '22px',
          height:          '22px',
          margin:          '0 10px',
          overflow:        'hidden',
          fontSize:        '22px',
          color:           ColorPalette._2d3a54,
          '&:hover':       {
            backgroundColor: ColorPalette._e4e9f2,
          }
        }}>
        <FontAwesomeIcon
          icon="user"
          style={{ paddingTop: '6px' }}
        />
      </IconButton>

    </Tooltip>
  );
}
