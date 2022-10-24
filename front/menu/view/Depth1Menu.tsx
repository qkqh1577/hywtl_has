import {
  Box,
  Collapse,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { ColorPalette } from 'assets/theme';
import { Menu } from 'menu/domain';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import Depth2Menu from 'menu/view/Depth2Menu';

interface Props
  extends Menu {

}

export default function Depth1Menu(props: Props) {

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(true);
  const active = props.path && !props.children && pathname.startsWith(props.path);
  const childActive = props.path && pathname.startsWith(props.path);
  const clickable = typeof props.path === 'string' && !props.children;
  const onClick = () => {
    if (clickable) {
      navigate(props.path!);
    }
  };
  return (
    <Box
      onClick={onClick}
      sx={{
        width:        '100%',
        marginBottom: '5px',
        color:        ColorPalette._ffffff,
        display:      'flex',
        flexWrap:     'wrap',
        alignItems:   'center',
        cursor:       clickable ? 'pointer' : 'default'
      }}>
      <Box sx={{
        display:         'flex',
        flexWrap:        'nowrap',
        width:           '100%',
        height:          '40px',
        justifyContent:  'space-between',
        alignItems:      'center',
        backgroundColor: active ? ColorPalette._4c9eeb : 'transparent',
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
              color:    active ? ColorPalette._0047d3 : ColorPalette._4c9eeb,
              padding:  '0 10px',
              fontSize: '16px',
            }}
          />
          <Typography
            children={props.title}
            sx={{
              fontSize: '13px',
              color:    childActive ? ColorPalette._ffffff : ColorPalette._94a6ca,
            }}
          />
        </Box>
        {props.children && (
          <FontAwesomeIcon
            icon="angle-up"
            onClick={() => {
              setOpen(!open);
            }}
            style={{
              cursor:     'pointer',
              transition: 'transform .2s',
              transform:  open ? 'rotate(0deg)' : 'rotate(180deg)',
              color:      ColorPalette._697183,
              padding:    '0 10px',
              fontSize:   '13px',
            }}
          />
        )}
      </Box>
      {props.children && (
        <Collapse in={open}>
          <Box sx={{
            display:         'flex',
            width:           '100%',
            flexWrap:        'wrap',
            backgroundColor: ColorPalette._242e43,
            marginTop:       '5px',
            alignContent:    'flex-start',
          }}>
            {props.children.map(child => (
              <Depth2Menu key={child.title} {...child} />
            ))}
          </Box>
        </Collapse>

      )}
    </Box>
  );
}