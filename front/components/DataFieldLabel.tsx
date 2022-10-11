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
  required?: boolean;
}

export default function DataFieldWithLabel(props: Props) {

  const {
          labelPosition,
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
      flexWrap:       useMemo(() => labelPosition === 'top' ? 'wrap' : 'nowrap', [labelPosition]),
      justifyContent: 'space-between',
      alignContent:   'center',
      alignItems:     'center',
    }}>
      <Box sx={{
        display:      'flex',
        alignContent: 'center',
        height:       useMemo(() => labelPosition === 'top' ? 'auto' : '100%', [labelPosition]),
        alignItems:   'center',
        flexWrap:     'nowrap',
      }}>
        <Typography sx={{
          ...labelSX,
          fontSize:    '13px',
          color:       ColorPalette._9b9ea4,
          wordBreak:   'keep-all',
          whiteSpace:  'nowrap',
          marginRight: '20px',
          width:       useMemo(() => labelPosition === 'top' ? '100%' : (labelWidth ? `${labelWidth}px` : 'auto'), [labelPosition, labelWidth]),
        }}>
          <RequiredMark required={required} text={label} />
        </Typography>
      </Box>
      <Box sx={{
        display:  'flex',
        height:   useMemo(() => labelPosition === 'top' ? 'auto' : '100%', [labelPosition]),
        flexWrap: 'nowrap',
        width:    useMemo(() => labelPosition === 'top' ? '100%' : (labelWidth ? `calc(100% - ${labelWidth}px)` : 'auto'), [labelPosition, labelWidth]),
      }}>
        {children}
      </Box>
    </Box>
  );
}