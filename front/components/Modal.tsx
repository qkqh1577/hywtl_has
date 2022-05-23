import React from 'react';
import {
  Box,
  IconButton,
  Modal as MuiModal,
  Paper
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

type Props = {
  open: boolean;
  title: string;
  width?: string | number;
  onClose: () => void;
  children: React.ReactElement;
  sx?: any;
}
const Modal = ({
  open,
  title,
  width = '50%',
  onClose,
  children,
  sx
}: Props) => {

  return (
    <MuiModal
      open={open}
      onClose={(event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          return;
        }
        onClose();
      }}
      disableEscapeKeyDown
    >
      <Paper sx={{
        ...(sx ?? {}),
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: typeof width === 'number' ? `${width}px` : width,
        overflow: 'hidden',
        bgColor: '#777',
        p: 4,
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          height: '50px',
          mb: '40px',
        }}>
          <h2>
            {title}
          </h2>
          <IconButton
            color="primary"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{
          display: 'flex',
          width: '100%',
          mb: '40px',
        }}>
          {children}
        </Box>
      </Paper>
    </MuiModal>
  );
};

export default Modal;
