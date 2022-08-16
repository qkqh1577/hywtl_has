import React from 'react';
import {
  Box,
  IconButton,
  Modal,
  Paper
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface Props {
  open: boolean;
  title: string;
  width?: string | number;
  onClose: () => void;
  children: React.ReactElement;
  sx?: any;
}

const ModalLayout = ({
                       open,
                       title,
                       width = '80vw',
                       onClose,
                       children,
                       sx
                     }: Props) => {
  return (
    <Modal
      open={open}
      onClose={(event,
                reason
      ) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          return;
        }
        onClose();
      }}
      disableEscapeKeyDown
    >
      <Paper sx={{
        ...(sx ?? {}),
        position:  'absolute',
        top:       '50%',
        left:      '50%',
        transform: 'translate(-50%, -50%)',
        width,
        maxWidth:  '1850px',
        height:    '100%',
        maxHeight: '80vh',
        overflow:  'hidden',
        bgColor:   '#777',
        p:         4,
      }}>
        <Box sx={{
          display:        'flex',
          justifyContent: 'space-between',
          width:          '100%',
          height:         '50px',
          mb:             '40px',
        }}>
          <h2>
            {title}
          </h2>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{
          display:  'flex',
          mb:       '40px',
          height:   'calc(100% - 90px)',
          overflow: 'auto'
        }}>
          {children}
        </Box>
      </Paper>
    </Modal>
  );
};

export default ModalLayout;
