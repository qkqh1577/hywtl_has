import { Box } from '@mui/material';
import logo from 'assets/logo.png';
import IconButton from 'components/IconButton';
import {
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon
} from '@mui/icons-material';
import React from 'react';
import { MenuDrawerProps } from 'app/view/App/MenuDrawer';

export default function MenuAppBar({
                                     openMenu,
                                     toggleMenu
                                   }: MenuDrawerProps) {

  return (
    <Box sx={{
      width:          '260px',
      padding:        '12px 4px',
      display:        'flex',
      flexWrap:       'wrap',
      justifyContent: 'space-between',
      alignContent:   'flex-end',
      borderRight:    '1px solid rgb(245, 245, 245)'
    }}>
      <img src={logo} width="auto" height="30px" alt="한양풍동실험연구소_로고" />
      <Box sx={{
        display:         'flex',
        justifyContent:  'center',
        alignContent:    'center',
        alignItems:      'center',
        width:           '36px',
        height:          '30px',
        backgroundColor: '#c4baf5',
        borderRadius:    '4px'
      }}>
        <IconButton
          tooltip={'메인 메뉴 ' + (openMenu ? '접기' : '펴기')}
          onClick={toggleMenu}
          children={openMenu ? <LeftIcon /> : <RightIcon />}
        />
      </Box>
    </Box>
  );
}