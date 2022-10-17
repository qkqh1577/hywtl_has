import React from 'react';
import { Typography } from '@mui/material';

interface Props {
  text?: React.ReactNode;
  required?: boolean;
}

const RequiredMark = ({
    text,
    required
  }: Props) =>
    <>
      {text}
      {required && (
        <Typography
          variant="caption"
          sx={{
            marginLeft: '4px',
            fontSize: '0.7rem'
          }}>
          *
        </Typography>
      )}
    </>
;

export default RequiredMark;