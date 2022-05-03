import { Box, Button, Divider, Grid, IconButton, Paper, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Edit as EditIcon, EditOff as ResetIcon, SaveAs as SaveIcon } from '@mui/icons-material';
import { DataField, DateFormat } from 'components';
import {
  initProjectTarget,
  ProjectTargetView
} from 'services/project/view';
import useProject from 'services/project/hook';
import { ProjectTargetParameter } from 'services/project/parameter';

const ProjectTargetDetail = () => {

  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;
  const {
    projectState: {
      target: detail,
      reviewList,
      documentList,
    },
    getTarget: getOne,
    setTarget: setOne,
    clearTarget: clearOne,
    updateTarget: update,
  } = useProject();
  const [open, setOpen] = useState<boolean>(true);
  const [view, setView] = useState<ProjectTargetView>(initProjectTarget);
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
      const landModelCount: number | undefined = values.landModelCount || undefined;
      if (Object.keys(errors).length > 0) {
        setSubmitting(false);
        setErrors(errors);
        return;
      }

      const params: ProjectTargetParameter = {
        landModelCount,
      };
      update(projectId, params, (data) => {
        if (data) {
          window.alert('저장되었습니다.');
          setOne(data);
          setEdit(false);
        }
        setSubmitting(false);
      });
    },
    updateView: () => {
      setView({
        landModelCount: detail?.landModelCount ?? view.landModelCount,
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
        {({ values, errors, isSubmitting, dirty, setFieldValue, handleSubmit, resetForm }) => (
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
                    형상비 검토
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
              transition: (theme) => theme.transitions.create('height', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              ...(!open && {
                overflowY: 'hidden',
                height: '0px',
                transition: (theme) => theme.transitions.create('height', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                })
              })
            }}>
              <Grid container spacing={2}>
                <Grid item sm={2}>
                  <DataField
                    type="number"
                    name="landModelCount"
                    label="대지모형 개수"
                    value={values.landModelCount}
                    setFieldValue={setFieldValue}
                    errors={errors}
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

export default ProjectTargetDetail;
