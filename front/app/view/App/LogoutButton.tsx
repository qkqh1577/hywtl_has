import React from 'react';
import useDialog from 'components/Dialog';
import { DefaultFunction } from 'type/Function';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'app/view/App/theme';
import {
  Box,
  Tooltip
} from '@mui/material';

interface Props {
  onLogout: DefaultFunction;
}

export default function (props: Props) {

  const { confirm } = useDialog();
  const onClick = () => {
    confirm({
      children:     '로그아웃하시겠습니까?',
      confirmText:  '로그아웃',
      afterConfirm: props.onLogout
    });
  };

  return (
    <Tooltip title="로그아웃" placement="bottom">
      <Box sx={{
        fontSize:  '20px',
        color:     ColorPalette._697183,
        margin:    '0 10px',
        cursor:    'pointer',
        '&:hover': {
          color: ColorPalette._e4e9f2,
        }
      }}>
        <FontAwesomeIcon
          icon="arrow-right-from-bracket"
          onClick={onClick}
        />
      </Box>
    </Tooltip>
  );
};