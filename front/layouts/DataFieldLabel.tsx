import React, { useMemo } from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import RequiredMark from 'layouts/RequiredMark';
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
        <Box sx={{
          marginRight: '20px',
          width:       useMemo(() => labelPosition === 'top' ? '100%' : `${labelWidth}px`, [labelPosition, labelWidth]),
        }}>
          {typeof label === 'string' && (
            <Typography sx={{
              ...labelSX,
              fontSize:       '13px',
              color:          ColorPalette._9b9ea4,
              wordBreak:      'keep-all',
              whiteSpace:     'nowrap',
              justifyContent: 'space-between',
              width:          '100%',
            }}>
              <RequiredMark required={required} text={label} />
            </Typography>
          )}
          {typeof label !== 'string' && label}
        </Box>

      </Box>
      <Box sx={{
        display:  'flex',
        height:   useMemo(() => labelPosition === 'top' ? 'auto' : '100%', [labelPosition]),
        flexWrap: 'nowrap',
        width:    useMemo(() => labelPosition === 'top' ? '100%' : `calc(100% - ${labelWidth}px)`, [labelPosition, labelWidth]),
      }}>
        {children}
      </Box>
    </Box>
  );
}