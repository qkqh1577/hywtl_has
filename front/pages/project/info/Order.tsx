import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProject from 'services/project/hook';
import { initProjectOrder, ProjectOrderView } from 'services/project/view';
import { Form, Formik, FormikHelpers } from 'formik';
import { ProjectOrderParameter } from 'services/project/parameter';
import { Box, Button, Divider, Grid, IconButton, Paper, Typography } from '@mui/material';
import { Edit as EditIcon, EditOff as ResetIcon, SaveAs as SaveIcon } from '@mui/icons-material';
import { DataField, DateFormat, DatePicker } from 'components';

const ProjectOrderDetail = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;

  const {
    projectState: {
      order: detail
    },
    getOrder: getOne,
    setOrder: setOne,
    clearOrder: clearOne,
    updateOrder: update
  } = useProject();
  const [open, setOpen] = useState<boolean>(true);
  const [view, setView] = useState<ProjectOrderView>(initProjectOrder);
  const [edit, setEdit] = useState<boolean>(false);

  const handler = {
    toggle: () => {
      setOpen(!open);
    },
    edit: () => {
      setEdit(true);
    },
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      if (!projectId || !detail) {
        return;
      }
      const errors: any = {};

      const amount: number | undefined = values.amount || undefined;
      if (amount && amount < 0) {
        errors.amount = '금액은 음수가 될 수 없습니다.';
      }

      const receivedDate: Date | undefined = values.receivedDate || undefined;
      const beginDate: Date | undefined = values.beginDate || undefined;
      const closeDate: Date | undefined = values.closeDate || undefined;
      const isOnGoing: boolean | undefined =
        typeof values.isOnGoing === 'string' && values.isOnGoing !== '' ?
          values.isOnGoing === '예' : undefined;

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }

      const params: ProjectOrderParameter = {
        amount,
        receivedDate,
        beginDate,
        closeDate,
        isOnGoing
      };

      update(projectId, params, ((data) => {
        if (data) {
          window.alert('수정하였습니다.');
          setOne(data);
          setEdit(false);
        }
        setSubmitting(false);
      }));
    },
    updateView: () => {
      setView({
        amount: detail?.amount ?? view.amount,
        receivedDate: detail?.receivedDate ?? view.receivedDate,
        beginDate: detail?.beginDate ?? view.beginDate,
        closeDate: detail?.closeDate ?? view.closeDate,
        isOnGoing: (detail && typeof detail.isOnGoing === 'boolean') ?
          (detail.isOnGoing ? '예' : '아니요') : view.isOnGoing
      });
    }
  };

  useEffect(() => {
    if (projectId) {
      getOne(projectId);
    }
    return () => {
      clearOne();
    };
  }, [projectId]);

  useEffect(() => {
    handler.updateView();
  }, [detail]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>
      <Formik
        initialValues={view}
        onSubmit={handler.submit}
        enableReinitialize
      >
        {({ values,errors, isSubmitting, dirty, setFieldValue, handleSubmit, resetForm }) => (
          <Form>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              mb: '40px',
            }}>
              <Grid container spacing={2} sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}>
                <Grid item sx={{
                  display: 'flex',
                  flexWrap: 'nowrap',
                  alignItems: 'center',
                }}>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      marginRight: '4px'
                    }}
                  >
                    프로젝트 주요 정보
                  </Typography>
                  {open && edit && (
                    <>
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        width: '25px',
                        height: '25px',
                        backgroundColor: (theme) => theme.palette.primary.main,
                        borderRadius: '4px'
                      }}>
                        <IconButton
                          disabled={isSubmitting || !dirty}
                          onClick={() => {
                            handleSubmit();
                          }}
                          sx={{
                            color: '#ffffff',
                            maxHeight: '21px'
                          }}>
                          <SaveIcon />
                        </IconButton>
                      </Box>
                      <Box color="primary" sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        width: '25px',
                        height: '25px',
                        backgroundColor: (theme) => theme.palette.primary.main,
                        borderRadius: '4px'
                      }}>
                        <IconButton
                          onClick={() => {
                            if (edit && dirty) {
                              if (window.confirm('수정을 취소하겠습니까? 작성 중인 내용은 사라집니다.')) {
                                resetForm();
                                handler.updateView();
                                setEdit(false);
                              }
                            } else {
                              setEdit(false);
                            }
                          }}
                          sx={{
                            color: '#ffffff',
                            maxHeight: '21px'
                          }}>
                          <ResetIcon />
                        </IconButton>
                      </Box>
                    </>
                  )}
                  {open && !edit && (
                    <Box color="primary" sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: '25px',
                      height: '25px',
                      backgroundColor: (theme) => theme.palette.primary.main,
                      borderRadius: '4px'
                    }}>
                      <IconButton
                        onClick={handler.edit}
                        sx={{
                          color: '#ffffff',
                          maxHeight: '21px'
                        }}>
                        <EditIcon />
                      </IconButton>
                    </Box>
                  )}
                </Grid>
                {!edit && (
                  <Grid item sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                  }}>
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        marginRight: '4px'
                      }}
                    >
                      최종수정일시
                    </Typography>
                    <Typography
                      sx={{
                        marginRight: '8px'
                      }}
                    >
                      <DateFormat date={detail?.updatedTime} format="YYYY-MM-DD HH:mm" />
                    </Typography>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handler.toggle}
                      sx={{
                        maxHeight: '30px'
                      }}
                    >
                      {open ? '접기' : '펴기'}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
            <Box sx={{
              display: 'flex',
              width: '100%',
              mb: '40px',
            }}>
              <Grid container spacing={2}>
                <Grid item sm={3}>
                  <DataField
                    type="amount"
                    name="amount"
                    label="총 수주 금액"
                    value={values.amount}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <DatePicker
                    name="receivedDate"
                    label="수주일"
                    value={values.receivedDate}
                    setFieldValue={setFieldValue}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <DatePicker
                    name="beginDate"
                    label="착수일"
                    value={values.beginDate}
                    setFieldValue={setFieldValue}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <DatePicker
                    name="closeDate"
                    label="마감일"
                    value={values.closeDate}
                    setFieldValue={setFieldValue}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <DataField
                    type="select"
                    name="isOnGoing"
                    label="수주 적용 여부"
                    value={values.isOnGoing}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    options={['예', '아니요']}
                    disabled={!edit}
                  />
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
      <Divider />
    </Paper>
  );
};

export default ProjectOrderDetail;
