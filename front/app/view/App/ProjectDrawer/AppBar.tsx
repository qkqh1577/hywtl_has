import {
  Box,
} from '@mui/material';
import IconButton from 'components/IconButton';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'app/view/App/theme';

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
      width:           '310px',
      height:          '100%',
      display:         'flex',
      flexWrap:        'nowrap',
      justifyContent:  'space-between',
      alignContent:    'center',
      padding:         '10px 10px',
      backgroundColor: ColorPalette._414d65
    }}>
      {projectAddModal}
      <IconButton
        tooltip={'프로젝트 메뉴 ' + (open ? '접기' : '펴기')}
        onClick={toggle}
        children={<FontAwesomeIcon icon={open ? 'angle-left' : 'angle-right'} />}
      />
    </Box>
  );
}