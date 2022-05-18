import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Paper, Table, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import {
  Close as CloseIcon
} from '@mui/icons-material';
import { Form, Formik, FormikHelpers } from 'formik';
import { DataField, DataSelector, DatePicker, UserSelector } from 'components';
import {
  ProjectEstimateSheetView as View,
  initProjectEstimateSheetView as initView,
  projectEstimateSheetStatusList,
  projectEstimateSheetStatusName,
  useProjectEstimate,
} from 'services/project_estimate';
import { projectTargetReviewStatusName, useProjectTarget } from 'services/project_target';

const ProjectEstimateSheetModal = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;
  const {
    state: {
      sheetId,
      sheetDetail: detail,
    },
    getSheetOne: getOne,
    clearSheetOne: clearOne,
    clearSheetId,
  } = useProjectEstimate();
  const {
    state: {
      reviewList,
      reviewDetail,
    },
    getReviewList,
    getReview,
    clearReviewList,
    clearReview,
  } = useProjectTarget();
  const [view, setView] = useState<View>(initView);
  const [reviewId, setReviewId] = useState<number | undefined>();

  const handler = {
    close: (event: object, reason?: string) => {
      if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
        return;
      }
      clearOne();
      clearSheetId();
    },
    submit: (values: any, { setErrors, setSubmitting }: FormikHelpers<any>) => {

    },
  };

  useEffect(() => {
    if (typeof sheetId !== 'undefined' && projectId) {
      getReviewList(projectId);
    }
    return () => {
      clearReviewList();
    };
  }, [projectId, sheetId]);

  useEffect(() => {
    if (sheetId) {
      getOne(sheetId);
    } else if (projectId && sheetId === null) {
      // TODO: 용역 항목 리스트 불러오기
    }
  }, [sheetId]);

  useEffect(() => {
    if (reviewId) {
      getReview(reviewId);
    }
    return () => {
      clearReview();
    };
  }, [reviewId]);

  return (
    <Modal
      open={typeof sheetId !== 'undefined'}
      onClose={handler.close}
    >
      <Paper sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxHeight: '70%',
        overflow: 'hidden',
        bgColor: '#777',
        p: 4,
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '50px',
          mb: '40px',
        }}>
          <h2>시스템 견적서 {sheetId === null ? '등록' : '수정'}</h2>
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
              handleSubmit,
            }) => (
              <Form>
                <Box sx={{
                  display: 'flex',
                  width: '100%',
                  mb: '40px',
                }}>
                  <Grid container spacing={2}>
                    <Grid item sm={1}>
                      <DataField
                        type="select"
                        name="confirmed"
                        label="확정 여부"
                        value={values.confirmed}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        options={['Y', 'N']}
                        required
                      />
                    </Grid>
                    <Grid item sm={2}>
                      <DataField
                        type="select"
                        name="status"
                        label="상태"
                        value={values.status}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        options={projectEstimateSheetStatusList.map(item => ({
                          key: item as string,
                          text: projectEstimateSheetStatusName(item),
                        }))}
                        required
                      />
                    </Grid>
                    <Grid item sm={4}>
                      <DataField
                        name="title"
                        label="제목"
                        value={values.title}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        required
                      />
                    </Grid>
                    <Grid item sm={3}>
                      <DataField
                        name="memo"
                        label="비고"
                        value={values.memo}
                        setFieldValue={setFieldValue}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item sm={2}>
                      <Button
                        variant="contained"
                        disabled={isSubmitting}
                        onClick={() => {
                          // TODO: 금액 재계산
                        }}
                      >
                        금액 재계산
                      </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        disabled={isSubmitting}
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        {isSubmitting ? '저장 중' : '저장'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{
                  display: 'flex',
                  width: '100%',
                  mb: '40px',
                }}>
                  <Grid container spacing={2}>
                    <Grid item sm={3} sx={{
                      display: 'flex',
                      width: '100%',
                      flexWrap: 'wrap',
                    }}>
                      <Box sx={{
                        display: 'flex',
                        width: '100%',
                        flexWrap: 'wrap',
                        mb: '20px',
                      }}>
                        <DataSelector
                          name="reviewId"
                          label="형상비 검토"
                          setFieldValue={setFieldValue}
                          errors={errors}
                          options={reviewList?.map(item => ({
                            key: item.id,
                            text: `${item.code}(${projectTargetReviewStatusName(item.status)})`,
                          })) ?? null}
                          value={values.reviewId}
                          onChange={(data) => {
                            const value: number | undefined
                              = data !== '' && Number.isNaN(+data)
                              ? +data
                              : undefined;
                            setReviewId(value);
                          }}
                        />
                      </Box>
                      <Box sx={{
                        display: 'flex',
                        width: '100%',
                        flexWrap: 'wrap',
                        mb: '40px',
                      }}>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell variant="head">
                                  대지 모형 개수
                                </TableCell>
                              </TableRow>
                            </TableHead>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Grid>
                    <Grid item sm={9}>
                      <Box sx={{
                        display: 'flex',
                        width: '100%',
                        mb: '40px',
                      }}>
                        <Grid container spacing={2}>
                          <Grid item sm={3}>
                            <DatePicker
                              name="estimateDate"
                              label="견적일자"
                              value={values.estimateDate}
                              setFieldValue={setFieldValue}
                              errors={errors}
                              required
                            />
                          </Grid>
                          <Grid item sm={3}>
                            <DatePicker
                              name="expectedStartMonth"
                              label="착수 가능"
                              value={values.expectedStartMonth}
                              setFieldValue={setFieldValue}
                              errors={errors}
                            />
                          </Grid>
                          <Grid item sm={3}>
                            <UserSelector
                              name="salesTeamLeaderId"
                              label="영업팀장"
                              value={values.salesTeamLeaderId}
                              setFieldValue={setFieldValue}
                              errors={errors}
                              required
                            />
                          </Grid>
                          <Grid item sm={3}>
                            <UserSelector
                              name="salesManagementLeaderId"
                              label="영업실장"
                              value={values.salesManagementLeaderId}
                              setFieldValue={setFieldValue}
                              errors={errors}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                      <Box sx={{
                        display: 'flex',
                        width: '100%',
                        mb: '40px',
                        justifyContent: 'center'
                      }}>
                        합계(부가세 별도): 일금 원정 ()
                      </Box>
                      <Box sx={{
                        display: 'flex',
                        width: '100%',
                        mb: '40px',
                      }}>
                        용역항목 Table TBD
                      </Box>
                      <Box sx={{
                        display: 'flex',
                        width: '100%',
                        mb: '40px',
                      }}>
                        사용 문구 Table TBD
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ProjectEstimateSheetModal;
