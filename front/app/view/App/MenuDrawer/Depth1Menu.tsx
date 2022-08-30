import {
  Box,
  Typography,
} from '@mui/material';
import React from 'react';
import { ColorPalette } from 'app/view/App/theme';
import { Menu } from 'app/domain/menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import Depth2Menu from 'app/view/App/MenuDrawer/Depth2Menu';

interface Props
  extends Menu {

}

export default function Depth1Menu(props: Props) {

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onClick = () => {
    if (props.path) {
      console.log(props);
      navigate(props.path);
    }
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        width:        '100%',
        marginBottom: '5px',
        color:        ColorPalette.White,
        display:      'flex',
        flexWrap:     'wrap',
        alignItems:   'center',
        cursor:       props.path ? 'pointer' : 'default'
      }}>
      <Box sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        width:          '100%',
        height:         '40px',
        justifyContent: 'space-between',
        alignItems:     'center',
      }}>
        <Box sx={{
          display:    'flex',
          flexWrap:   'nowrap',
          height:     '100%',
          alignItems: 'center',
        }}>
          <FontAwesomeIcon
            icon={props.icon}
            style={{
              color:    ColorPalette._4c9eeb,
              padding:  '0 10px',
              fontSize: '16px',
            }}
          />
          <Typography
            children={props.title}
            sx={{
              fontSize: '13px',
              color:    ColorPalette._94a6ca,
            }}
          />
        </Box>
        {props.children && (
          <FontAwesomeIcon
            icon="angle-up"
            style={{
              color:    ColorPalette._697183,
              padding:  '0 10px',
              fontSize: '13px',
            }}
          />
        )}
      </Box>
      {props.children && (
        <Box
          sx={{
            display:         'flex',
            width:           '100%',
            flexWrap:        'wrap',
            backgroundColor: ColorPalette._242e43,
            paddingLeft:     '30px',
            alignContent:    'flex-start',
          }}>
          {props.children.map(child => (
            <Depth2Menu key={child.title} {...child} />
          ))}
        </Box>
      )}
    </Box>
  );
}