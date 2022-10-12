import { Box } from '@mui/material';
import logo from 'assets/logo.png';
import IconButton from 'layouts/IconButton';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DefaultFunction } from 'type/Function';

interface Props {
  open: boolean;
  toggleMenu: DefaultFunction;
}

export default function MenuBar(props: Props) {

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
        tooltip={'메인 메뉴 ' + (props.open ? '접기' : '펴기')}
        onClick={props.toggleMenu}
        children={<FontAwesomeIcon icon={props.open ? 'angle-left' : 'angle-right'} />}
      />
    </Box>
  );
}