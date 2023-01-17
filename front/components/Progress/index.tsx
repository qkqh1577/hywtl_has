import React from 'react';
import {
  Backdrop,
  CircularProgress
} from '@mui/material';
import {useSelector} from 'react-redux';
import {RootState} from 'services/reducer';
import {SxProps} from "@mui/system";

interface ProgressProps {
  loading?: boolean
  sx?: SxProps
}

export const Progress = (props: ProgressProps) => {
  const {progress} = useSelector((root: RootState) => root.progress);
  return (
    <Backdrop sx={{...props?.sx, color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999}}
              open={!!progress || !!props.loading}>
      <CircularProgress color="inherit"/>
    </Backdrop>
  );
}
