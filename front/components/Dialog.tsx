import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { RootState } from 'services/common/reducer';

type AlertStatus = 'ok' | 'warn' | 'error';
type AlertProps = {
  title?: string;
  status?: AlertStatus;
  closeText?: string;
  afterClose?: () => void;
  children?: string | React.ReactNode;
};

type ConfirmProps = AlertProps & {
  afterConfirm: () => void;
  confirmText: string;
}

enum DialogActionType {
  openAlert = 'system/dialog/open/alert',
  openConfirm = 'system/dialog/open/confirm',
  close = 'system/dialog/close',
}

const dialogActions = {
  openAlert: createAction(DialogActionType.openAlert)<AlertProps | string>(),
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
    const init: AlertProps = {
      title: 'ALERT',
      status: 'ok',
      closeText: '닫기',
    };
    const alertProps = {
      title: props.title ?? init.title,
      status: props.status ?? init.status,
      closeText: props.closeText ?? init.closeText,
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useCallback(
    (props: AlertProps | string, afterClose?: (() => void) | string) => {
      if (typeof props === 'string') {
        return dispatch(dialogActions.openAlert({
          children: props,
          afterClose: typeof afterClose === 'string' ? () => {
            navigate(afterClose);
          } : afterClose
        }));
      }
      return dispatch(dialogActions.openAlert(props));
    },
    [dispatch]
  );

  const error = useCallback(
    (message: string, afterClose?: (() => void) | string) =>
      dispatch(dialogActions.openAlert({
        children: message,
        status: 'error',
        afterClose: typeof afterClose === 'string' ? () => {
          navigate(afterClose);
        } : afterClose
      })),
    [dispatch]
  );

  const confirm = useCallback(
    (props: ConfirmProps) =>
      dispatch(dialogActions.openConfirm(props)),
    [dispatch],
  );

  const rollback = useCallback(
    (message: string, afterConfirm: () => void) =>
      dispatch(dialogActions.openConfirm({
        children: message,
        confirmText: '작업 취소',
        status: 'warn',
        afterConfirm,
      })),
    [dispatch]
  );

  const remove = useCallback(
    (message: string, afterConfirm: () => void) =>
      dispatch(dialogActions.openConfirm({
        children: message,
        confirmText: '삭제',
        status: 'error',
        afterConfirm,
      })),
    [dispatch]
  );

  const close = useCallback(
    () =>
      dispatch(dialogActions.close()),
    [dispatch],
  );

  return {
    state,
    alert,
    error,
    confirm,
    rollback,
    remove,
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
export const Confirm = () => {
  const {
    state: {
      confirmProps
    },
    close,
  } = useDialog();

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    if (confirmProps && confirmProps.afterClose) {
      confirmProps.afterClose();
    }
    setOpen(false);
  };

  const handleConfirm = () => {
    if (confirmProps && confirmProps.afterConfirm) {
      confirmProps.afterConfirm();
    }
    handleClose();
  };

  useEffect(() => {
    if (!open && confirmProps) {
      setOpen(true);
    }
  }, [confirmProps]);

  useEffect(() => {
    if (!open && confirmProps) {
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
            {confirmProps?.title}
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
        {confirmProps?.children}
      </DialogContent>
      <DialogActions>
        <Button
          color={getColor(confirmProps?.status)}
          variant="contained"
          onClick={handleConfirm}
        >
          {confirmProps?.confirmText}
        </Button>
        <Button
          variant="contained"
          onClick={handleClose}
        >
          {confirmProps?.closeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default useDialog;