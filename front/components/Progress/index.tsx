import React from 'react';
import {
  Backdrop,
  CircularProgress
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';

export const Progress = () => {
  const { progress } = useSelector((root: RootState) => root.progress);
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }}
      open={!!progress}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
