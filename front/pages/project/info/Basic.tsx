import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Divider, Grid, IconButton, Paper, Typography } from '@mui/material';
import {
  Edit as EditIcon,
  SaveAs as SaveIcon,
  EditOff as ResetIcon,
} from '@mui/icons-material';
import { DateFormat, DataField, UserSelector } from 'components';
import useProject from 'services/project/hook';
import { Form, Formik, FormikHelpers } from 'formik';
import { initProjectBasic, ProjectBasicView } from 'services/project/view';
import { ProjectBasicParameter } from 'services/project/parameter';

const ProjectBasicDetail = () => {

  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;

  const {
    projectState: {
      basic: detail
    },
    getBasic: getOne,
    setBasic: setOne,
    clearBasic: clearOne,
    updateBasic: update,
  } = useProject();
  const [open, setOpen] = useState<boolean>(true);
  const [view, setView] = useState<ProjectBasicView>(initProjectBasic);
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

      const name: string = values.name;
      if (!name) {
        errors.name = '프로젝트명 입력은 필수입니다.';
      }

      const code: string = values.code;
      if (!code) {
        errors.code = '프로젝트 코드 입력은 필수입니다.';
      }

      const alias: string | undefined = values.alias || undefined;

      const salesManagerId: number = values.salesManagerId;
      if (!salesManagerId) {
        errors.salesManagerId = '영업 담당자 선택은 필수입니다.';
      }

      const projectManagerId: number = values.projectManagerId;
      if (!projectManagerId) {
        errors.projectManagerId = '담당 PM 선택은 필수입니다.';
      }

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }


      const params: ProjectBasicParameter = {
        name,
        code,
        alias,
        salesManagerId,
        projectManagerId,
      };

      update(projectId, params, (data) => {
        if (data) {
          window.alert('수정하였습니다.');
          setOne(data);
          setEdit(false);
        }
        setSubmitting(false);
      });
    },
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
    if (detail) {
      setView({
        name: detail.name,
        code: detail.code,
        alias: detail.alias ?? view.alias,
        salesManagerId: detail.salesManager.id,
        projectManagerId: detail.projectManager.id,
      });
    }
  }, [detail]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>
      <Formik
        initialValues={view}
        onSubmit={handler.submit}
        enableReinitialize
      >
        {({ values, isSubmitting, dirty, setFieldValue, handleSubmit, resetForm }) => (
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
                    기본 정보
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
                                setView({
                                  name: detail?.name ?? view.name,
                                  code: detail?.code ?? view.code,
                                  alias: detail?.alias ?? view.alias,
                                  salesManagerId: detail?.salesManager.id ?? view.salesManagerId,
                                  projectManagerId: detail?.projectManager.id ?? view.projectManagerId,
                                });
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
                <Grid item sm={2}>
                  <DataField
                    name="code"
                    label="프로젝트 코드"
                    value={values.code}
                    setFieldValue={setFieldValue}
                    disabled={!edit}
                    required
                  />
                </Grid>
                <Grid item sm={5}>
                  <DataField
                    name="name"
                    label="프로젝트명"
                    value={values.name}
                    setFieldValue={setFieldValue}
                    disabled={!edit}
                    required
                  />
                </Grid>
                <Grid item sm={3}>
                  <DataField
                    name="alias"
                    label="프로젝트 닉네임"
                    value={values.alias}
                    setFieldValue={setFieldValue}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <UserSelector
                    name="salesManagerId"
                    label="영업 담당자"
                    value={values.salesManagerId}
                    setFieldValue={setFieldValue}
                    disabled={!edit}
                    required
                  />
                </Grid>
                <Grid item sm={2}>
                  <UserSelector
                    name="projectManagerId"
                    label="담당 PM"
                    value={values.projectManagerId}
                    setFieldValue={setFieldValue}
                    disabled={!edit}
                    required
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

export default ProjectBasicDetail;
