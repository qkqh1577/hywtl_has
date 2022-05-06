import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, IconButton, Modal, Paper } from '@mui/material';
import {
  Close as CloseIcon
} from '@mui/icons-material';
import { Form, Formik, FormikHelpers } from 'formik';
import useProject from 'services/project/hook';
import { DataField } from 'components';
import {
  initProjectTargetDetailReview,
  initProjectTargetReview,
  ProjectTargetReviewView
} from 'services/project/view';

const ProjectTargetReviewModal = () => {
  const {
    projectState: {
      reviewDetailModal: modal,
      reviewDetail: detail,
    },
    clearTargetReviewDetailModal: clearModal,
    getTargetReviewDetail: getOne,
    clearTargetReviewDetail: clearOne,
  } = useProject();

  const [view, setView] = useState<ProjectTargetReviewView>(initProjectTargetReview);

  const handler = {
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {

    },
    close: () => {
      clearModal();
      clearOne();
    },
    updateView: () => {
      setView({
        status: detail?.status ?? view.status,
        confirmed: detail?.confirmed ?? view.confirmed,
        title: detail?.title ?? view.title,
        memo: detail?.memo ?? view.memo,
        detailList: detail?.detailList.map(item => {
          const initial = initProjectTargetDetailReview;
          return {
            buildingName: item.buildingName ?? initial.buildingName,
            floorCount: item.floorCount ?? initial.floorCount,
            baseCount: item.baseCount ?? initial.baseCount,
            height: item.height ?? initial.height,
            area: item.area ?? initial.area,
            ratio: item.ratio ?? initial.ratio,
            specialWindLoadConditionList: item.specialWindLoadConditionList ?? initial.specialWindLoadConditionList,
            testList: item.testList ?? initial.testList,
            memo1: item.memo1 ?? initial.memo1,
            memo2: item.memo2 ?? initial.memo2,
          };
        }) ?? view.detailList
      });
    }
  };

  useEffect(() => {
    if (typeof modal === 'number') {
      getOne(modal);
    }
    return () => {
      clearOne();
    };
  }, [modal]);

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
        <Box sx={{ mb: '20px' }}>
          <Formik
            initialValues={view}
            onSubmit={handler.submit}
            enableReinitialize
          >
            {({
              values,
              errors,
              isSubmitting,
              setFieldValue,
              handleSubmit
            }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <DataField
                      type="select"
                      name="status"
                      label="확정 여부"
                      value={values.status ? 'Y' : 'N'}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      options={['Y', 'N']}
                      required
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ProjectTargetReviewModal;
