import React, {useCallback} from 'react';
import {Alert as MuiAlert, Snackbar as MuiSnackbar} from '@mui/material'
import {useDispatch, useSelector} from "react-redux";
import {snackbarAction} from "./action";
import {RootState} from "../../services/reducer";

interface SnackbarProps {
}

export default function Snackbar(props: SnackbarProps) {
  const {open, message, severity} = useSelector((root: RootState) => root.snackbar);
  const autoHideDuration = 5000;
  const dispatch = useDispatch();
  const handleClose = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(snackbarAction.setOpen(false));
  }, [dispatch]);

  return (
    <MuiSnackbar
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      open={open}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
    >
      <MuiAlert
        sx={{boxShadow: 3}}
        severity={severity}
        onClose={handleClose}
      >{message}</MuiAlert>
    </MuiSnackbar>
  )
}