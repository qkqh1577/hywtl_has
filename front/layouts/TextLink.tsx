import {
  Typography,
  TypographyProps
} from '@mui/material';
import { ColorPalette } from 'assets/theme';
import { DefaultFunction } from 'type/Function';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

interface Props extends Pick<TypographyProps, 'sx'>{
  children: string;
  onClick?: string | DefaultFunction;
}

export default function TextLink(props: Props) {

  const navigate = useNavigate();

  const sx = {
    width:      '100%',
    textAlign:  'center',
    fontSize:   'inherit',
    fontWeight: props.onClick ? 'bold' : 'inherit',
    cursor:     props.onClick ? 'pointer' : 'default',
    '&:hover':  {
      color:              ColorPalette._386dd6,
      textDecorationLine: props.onClick ? 'underline' : 'inherit',
    },
    ...(props.sx ?? {}),
  } as SxProps<Theme>

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
      sx={sx}
    />
  );
}
