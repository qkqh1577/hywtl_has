import {
  Box,
  Button
} from '@mui/material';
import IconButton from 'components/IconButton';
import {
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon
} from '@mui/icons-material';
import React from 'react';

export interface ProjectAppBarProps {
  openMenu: boolean;
  toggleMenu: () => void;
}

export default function ProjectAppBar({
                                        openMenu,
                                        toggleMenu
                                      }: ProjectAppBarProps) {

  return (
    <Box sx={{
      width:          '340px',
      padding:        '12px 4px',
      display:        'flex',
      flexWrap:       'wrap',
      justifyContent: 'space-between',
      alignContent:   'flex-end',
      borderRight:    '1px solid rgb(245, 245, 245)'
    }}>
      <Button>신규 프로젝트 등록</Button>
      <IconButton
        tooltip={'프로젝트 메뉴 ' + (openMenu ? '접기' : '펴기')}
        onClick={toggleMenu}
        children={openMenu ? <LeftIcon /> : <RightIcon />}
      />
    </Box>
  );
}