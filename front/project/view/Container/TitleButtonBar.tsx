import React from 'react';
import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'assets/theme';
import { DefaultFunction } from 'type/Function';
import useDialog from 'dialog/hook';

interface Props {
  onDelete: DefaultFunction;
}
export default function ProjectContainerTitleButtonBar({onDelete}: Props) {
  const { confirm } = useDialog();
  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'flex-end',
      alignItems:     'center',
    }}>
      <FontAwesomeIcon
        icon="trash"
        onClick={() => {
          confirm({
            children:     '해당 프로젝트를 삭제하시겠습니까?',
            afterConfirm: () => {
              onDelete();
            },
            confirmText:  '확인',
          });
        }}
        style={{
          width:       '18px',
          height:      '18px',
          color:       ColorPalette._9bb6ea,
          marginRight: '20px',
          cursor:      'pointer',
        }}
      />
      <FontAwesomeIcon
        icon="star"
        style={{
          width:  '18px',
          height: '18px',
          color:  ColorPalette._386dd6,
          cursor:      'pointer',
        }}
      />
    </Box>
  );
}
