import { Box } from '@mui/material';
import logo from 'assets/logo.png';
import IconButton from 'components/IconButton';
import React from 'react';
import { MenuDrawerProps } from 'app/view/App/MenuDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MenuAppBar({
                                     openMenu,
                                     toggleMenu
                                   }: MenuDrawerProps) {

  return (
    <Box sx={{
      width:          '230px',
      height:         '100%',
      display:        'flex',
      flexWrap:       'nowrap',
      justifyContent: 'space-between',
      padding:        '10px 10px',
      alignContent:   'center',
    }}>
      <img src={logo} width="auto" height="70%" alt="한양풍동실험연구소_로고" />
      <IconButton
        tooltip={'메인 메뉴 ' + (openMenu ? '접기' : '펴기')}
        onClick={toggleMenu}
        children={<FontAwesomeIcon icon={openMenu ? 'angle-left' : 'angle-right'} />}
      />
    </Box>
  );
}