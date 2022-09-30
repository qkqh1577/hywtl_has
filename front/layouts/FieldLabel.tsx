import React from 'react';
import {
  Typography,
  TypographyProps
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import RequiredMark from 'components/RequiredMark';

interface Props {
  children: React.ReactNode;
  required?: boolean;
  width?: string;
  sx?: TypographyProps['sx'];
}

export default function FieldLabel(props: Props) {

  const {
          required,
          children,
          width,
          sx,
        } = props;

  return (
    <Typography sx={{
      ...sx,
      fontSize:   '13px',
      color:      ColorPalette._9b9ea4,
      wordBreak:  'keep-all',
      whiteSpace: 'nowrap',
      width,
    }}>
      <RequiredMark required={required} text={children} />
    </Typography>
  );
}