import React from 'react';
import { Box } from '@mui/material';
import { ColorPalette } from 'assets/theme';
import { DefaultFunction } from 'type/Function';
import useDialog from 'dialog/hook';
import { ProjectUpdateParameter } from 'project/parameter';
import IconButton from 'layouts/IconButton';
import Tooltip from 'components/Tooltip';
import {
  Delete,
  Star
} from '@mui/icons-material';

interface Props {
  onDelete: DefaultFunction;
  onUpdate: DefaultFunction<ProjectUpdateParameter>;
  isFavorite: boolean;
}

export default function ProjectContainerTitleButtonBar({ onDelete, onUpdate, isFavorite }: Props) {
  const { confirm } = useDialog();
  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'flex-end',
      alignItems:     'center',
    }}>
      <Tooltip title='프로젝트 삭제'>
        <IconButton
          onClick={() => {
            confirm({
              children:     '해당 프로젝트를 삭제하시겠습니까?',
              afterConfirm: () => {
                onDelete();
              },
              confirmText:  '확인',
            });
          }}
          sx={{
            marginRight: '20px',
            cursor:      'pointer'
          }}
        >
          <Delete />
        </IconButton>
      </Tooltip>
      <Tooltip title={isFavorite ? '즐겨찾기 삭제' : '즐겨찾기 추가'}>
        <IconButton
          onClick={() => {
            confirm({
              children:     isFavorite ? '즐겨찾기에서 삭제하시겠습니까?' : '즐겨찾기에 추가하시겠습니까?',
              afterConfirm: () => {
                onUpdate({
                  isFavorite: !isFavorite,
                });
              },
              confirmText:  '확인',
            });
          }}
          sx={{
            cursor:    'pointer',
            backgroundColor: isFavorite ? ColorPalette._2d3a54 : ColorPalette._4c9eeb,
          }}
        >
          <Star />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
