import { Menu } from 'app/domain/menu';
import React from 'react';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import {
  Box,
  Typography
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';

export default function Depth3Menu(props: Menu) {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const active = props.path && pathname.startsWith(props.path);
  const clickable = typeof props.path === 'string';
  const onClick = () => {
    if (clickable) {
      navigate(props.path!);
    }
  };
  return (
    <Box
      sx={{
        display:         'flex',
        width:           '100%',
        height:          '38px',
        alignItems:      'center',
        paddingLeft:     '50px',
        backgroundColor: active ? ColorPalette._4c9eeb : 'transparent',
      }}>
      <Typography
        children={`- ${props.title}`}
        onClick={onClick}
        sx={{
          fontSize: '13px',
          color:    active ? ColorPalette._ffffff : ColorPalette._94a6ca,
          cursor:   clickable ? 'pointer' : 'default'
        }}
      />
    </Box>
  );
}