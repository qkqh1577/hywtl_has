import {
  Box,
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
  projectAddModal: React.ReactNode;
}

export default function ProjectAppBar({
                                        openMenu,
                                        toggleMenu,
                                        projectAddModal
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
      {projectAddModal}
      <IconButton
        tooltip={'프로젝트 메뉴 ' + (openMenu ? '접기' : '펴기')}
        onClick={toggleMenu}
        children={openMenu ? <LeftIcon /> : <RightIcon />}
      />
    </Box>
  );
}