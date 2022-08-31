import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';

export interface TitleProps {
  title?: React.ReactNode;
  titleRightComponent?: React.ReactNode;
}

export default function Title(props: TitleProps) {
  const {
          title,
          titleRightComponent
        } = props;
  return (
    <Box sx={{
      display:        'flex',
      flexWrap:       'nowrap',
      width:          '100%',
      justifyContent: 'space-between',
      padding:        '0 20px 20px 20px',
    }}>
      <Box
        children={
          typeof title === 'object'
            ? title
            :
            <Typography
              children={title}
              sx={{

              }}
            />
        }
        sx={{
          display:  'flex',
          width:    '50%',
          flexWrap: 'nowrap'
        }}
      />
      {titleRightComponent && (
        <Box
          children={titleRightComponent}

        />
      )}
    </Box>
  );
}