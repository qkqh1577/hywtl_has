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
  open: boolean;
  toggle: () => void;
  projectAddModal: React.ReactNode;
}

export default function ProjectAppBar({
                                        open,
                                        toggle,
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
        tooltip={'프로젝트 메뉴 ' + (open ? '접기' : '펴기')}
        onClick={toggle}
        children={open ? <LeftIcon /> : <RightIcon />}
      />
    </Box>
  );
}