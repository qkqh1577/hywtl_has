import { IconButton } from '@mui/material';
import Tooltip from 'components/Tooltip';
import React from 'react';
import { DefaultFunction } from 'type/Function';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  openModal: DefaultFunction;
}

export default function ({ openModal }: Props) {
  return (
    <Tooltip title="계정 정보" placement="bottom">
      <IconButton color="info" onClick={openModal}>
        <FontAwesomeIcon icon="user" />
      </IconButton>
    </Tooltip>
  );
}
