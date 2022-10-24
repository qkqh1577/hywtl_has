import { Box, } from '@mui/material';
import IconButton from 'layouts/IconButton';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'assets/theme';
import { DefaultFunction } from 'type/Function';
import Button from 'layouts/Button';

export interface ProjectAppBarProps {
  open: boolean;
  toggle: DefaultFunction;
  openAddModal: DefaultFunction;
}

export default function ProjectAppBar({
                                        open,
                                        toggle,
                                        openAddModal
                                      }: ProjectAppBarProps) {

  return (
    <Box sx={{
      width:           '310px',
      height:          '100%',
      display:         'flex',
      flexWrap:        'nowrap',
      justifyContent:  'space-between',
      alignContent:    'center',
      padding:         '10px 10px',
      backgroundColor: ColorPalette._414d65
    }}>
      <Button shape="small" onClick={openAddModal}>신규 프로젝트 등록</Button>
      <IconButton
        tooltip={'프로젝트 메뉴 ' + (open ? '접기' : '펴기')}
        onClick={toggle}
        children={
          <FontAwesomeIcon
            icon={open ? 'angle-left' : 'angle-right'}
          />
        }
        sx={{
          marginLeft: '10px',
        }}
      />
    </Box>
  );
}