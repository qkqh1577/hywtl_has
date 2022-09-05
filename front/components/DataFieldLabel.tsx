import React, { useMemo } from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import RequiredMark from 'components/RequiredMark';
import { LabelProps } from 'components/DataFieldProps';

interface Props
  extends LabelProps {
  children: React.ReactNode;
  required: boolean | undefined;
}

export default function DataFieldWithLabel(props: Props) {

  const {
          labelPositionTop,
          labelSX,
          labelWidth,
          label,
          required,
          children
        } = props;

  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      flexWrap:       useMemo(() => labelPositionTop ? 'wrap' : 'nowrap', [labelPositionTop]),
      justifyContent: 'space-between',
      alignContent:   'center',
    }}>
      <Box sx={{
        display:      'flex',
        alignContent: 'center',
        height:       useMemo(() => labelPositionTop ? 'auto' : '100%', [labelPositionTop]),
        alignItems:   'center',
        flexWrap:     'nowrap',
      }}>
        <Typography sx={{
          ...labelSX,
          fontSize:  '13px',
          color:     ColorPalette.Grey['1'],
          wordBreak: 'keep-all',
          width:     useMemo(() => labelPositionTop ? '100%' : `${labelWidth ?? 110}px`, [labelPositionTop, labelWidth]),
        }}>
          <RequiredMark required={required} text={label} />
        </Typography>
      </Box>
      <Box sx={{
        display:  'flex',
        height:   useMemo(() => labelPositionTop ? 'auto' : '100%', [labelPositionTop]),
        flexWrap: 'nowrap',
        width:    useMemo(() => labelPositionTop ? '100%' : `calc(100% - ${20 + (labelWidth ?? 110)}px)`, [labelPositionTop, labelWidth]),
      }}>
        {children}
      </Box>
    </Box>
  );
}