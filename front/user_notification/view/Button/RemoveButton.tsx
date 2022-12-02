import React from 'react';
import {
  Box,
  Tooltip
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'assets/theme';
import useDialog from 'dialog/hook';

interface Props {
  onClick: () => void;
}

export default function RemoveButton(props: Props) {
  const {
          onClick,
        } = props;
  const { confirm } = useDialog();
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
          onClick={() => {
            confirm({
              children:     '해당 알림을 삭제하시겠습니까?',
              afterConfirm: () => {
                onClick();
              },
              confirmText:  '확인',
            });
          }}
        />
      </Tooltip>
    </Box>
  );
}
