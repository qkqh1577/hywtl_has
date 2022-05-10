import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAction, createReducer } from 'typesafe-actions';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { RootState } from 'services/common/reducer';
import { Close as CloseIcon } from '@mui/icons-material';

type AlertStatus = 'ok' | 'warn' | 'error';
type AlertProps = {
  title?: string;
  status?: AlertStatus;
  closeText?: string;
  afterClose?: () => void;
  children?: string | React.ReactNode;
};

type ConfirmProps = AlertProps & {
  afterConfirm?: () => void;
  confirmText?: string;
  isDangerous?: boolean;
}

enum DialogActionType {
  openAlert = 'system/dialog/open/alert',
  openConfirm = 'system/dialog/open/confirm',
  close = 'system/dialog/close',
}

const dialogActions = {
  openAlert: createAction(DialogActionType.openAlert)<AlertProps>(),
  openConfirm: createAction(DialogActionType.openConfirm)<ConfirmProps>(),
  close: createAction(DialogActionType.close)(),
};

export type DialogState = {
  alertProps?: AlertProps
  confirmProps?: ConfirmProps;
}

const initState: DialogState = {};

export const dialogReducer = createReducer(initState, {
  [DialogActionType.openAlert]: (state, action) => {
    const { payload: props } = action;
    const alertProps = {
      title: props.title ?? 'ALERT',
      status: props.status ?? 'ok',
      closeText: props.closeText ?? '닫기',
      afterClose: props.afterClose,
      children: props.children,
    };
    return {
      alertProps,
    };
  },
  [DialogActionType.openConfirm]: (state, action) => {
    const { payload: props } = action;
    const confirmProps = {
      title: props.title ?? 'ALERT',
      status: props.status ?? 'ok',
      closeText: props.closeText ?? '닫기',
      afterClose: props.afterClose,
      children: props.children,
      afterConfirm: props.afterConfirm,
      confirmText: props.confirmText ?? '확인',
      isDangerous: props.isDangerous,
    };
    return {
      confirmProps,
    };
  },
  [DialogActionType.close]: () => ({
    alertProps: undefined,
    confirmProps: undefined,
  })
});

const getColor = (status: AlertStatus | undefined) => {
  if (status === 'ok') {
    return 'primary';
  }
  if (status === 'warn') {
    return 'warning';
  }
  if (status === 'error') {
    return 'error';
  }
};

function useDialog() {
  const state = useSelector((state: RootState) => state.dialog);
  const dispatch = useDispatch();
  const openAlert = useCallback(
    (props: AlertProps) =>
      dispatch(dialogActions.openAlert(props)),
    [dispatch]
  );

  const openConfirm = useCallback(
    (props: ConfirmProps) =>
      dispatch(dialogActions.openConfirm(props)),
    [dispatch],
  );

  const close = useCallback(
    () =>
      dispatch(dialogActions.close()),
    [dispatch],
  );

  return {
    state,
    openAlert,
    openConfirm,
    close,
  };
}

export const Alert = () => {
  const {
    state: {
      alertProps
    },
    close,
  } = useDialog();

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    if (alertProps && alertProps.afterClose) {
      alertProps.afterClose();
    }
    setOpen(false);
  };

  useEffect(() => {
    if (!open && alertProps) {
      setOpen(true);
    }
  }, [alertProps]);

  useEffect(() => {
    if (!open && alertProps) {
      close();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle
        sx={{
          minWidth: '20vw',
        }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          height: '50px',
          flexWrap: 'wrap',
          alignContent: 'center',
          alignItems: 'center',
        }}>
          <h2>
            {alertProps?.title}
          </h2>
          <IconButton
            color="primary"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        {alertProps?.children}
      </DialogContent>
      <DialogActions>
        <Button
          color={getColor(alertProps?.status)}
          variant="contained"
          onClick={handleClose}
        >
          {alertProps?.closeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default useDialog;
