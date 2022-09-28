import { Typography } from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import { DefaultFunction } from 'type/Function';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface Props {
  children: string;
  onClick?: string | DefaultFunction;
}

export default function TextLink(props: Props) {

  const navigate = useNavigate();

  return (
    <Typography
      children={props.children}
      onClick={() => {
        if (typeof props.onClick === 'string') {
          navigate(props.onClick);
        }
        else if (props.onClick) {
          props.onClick();
        }
      }}
      sx={{
        fontSize:  'inherit',
        cursor:    'pointer',
        '&:hover': {
          color:              ColorPalette._386dd6,
          textDecorationLine: 'underline',
        }
      }}
    />
  );
}