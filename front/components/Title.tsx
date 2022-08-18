import React from 'react';
import {
  Box,
  Typography,
  TypographyVariant
} from '@mui/material';

export interface TitleProps {
  title?: React.ReactNode;
  titleVariant?: TypographyVariant;
  titleRightComponent?: React.ReactNode;
}

export default function Title(props: TitleProps) {
  const {
          title,
          titleVariant,
          titleRightComponent
        } = props;
  return (
    <Box sx={{
      display:        'flex',
      flexWrap:       'nowrap',
      width:          '100%',
      justifyContent: 'space-between',
      minHeight:      '50px',
    }}>
      <Box
        children={typeof title === 'object' ? title : <Typography variant={titleVariant ?? 'h4'} children={title} />}
        sx={{
          display:  'flex',
          width:    '50%',
          flexWrap: 'nowrap'
        }}
      />
      {titleRightComponent && (
        <Box
          children={titleRightComponent}
          sx={{
            display:        'flex',
            width:          '50%',
            flexWrap:       'nowrap',
            justifyContent: 'right',
          }}
        />
      )}
    </Box>
  );
}