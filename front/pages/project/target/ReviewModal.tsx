import React from 'react';
import { Box, Button, Grid, IconButton, Modal, Paper } from '@mui/material';
import {
  Close as CloseIcon
} from '@mui/icons-material';
import { Form, Formik, FormikHelpers } from 'formik';
import useProject from 'services/project/hook';

const ProjectTargetReviewModal = () => {
  const {
    projectState: {
      reviewDetailModal: modal,
    },
    clearTargetReviewDetailModal: clearModal,
  } = useProject();

  const handler = {
    close: () => {
      clearModal();
    }
  };

  return (
    <Modal
      open={typeof modal !== 'undefined'}
      onClose={handler.close}
    >
      <Paper sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
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
          <h2>형상비 검토 {modal === null ? '등록' : '상세'}</h2>
          <IconButton
            color="primary"
            onClick={handler.close}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ProjectTargetReviewModal;
