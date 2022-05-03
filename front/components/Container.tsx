import React, { useState } from 'react';
import { Form, Formik, FormikErrors, FormikHelpers, FormikValues } from 'formik';
import { Box, Button, Divider, Grid, IconButton, Paper, Typography } from '@mui/material';
import { Edit as EditIcon, EditOff as ResetIcon, SaveAs as SaveIcon } from '@mui/icons-material';
import { DateFormat } from 'components/index';

type State = {
  values: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  errors: FormikErrors<FormikValues>,
  edit: boolean;
}
type Props = {
  title: string;
  view: any;
  submit: (values: any, callback: () => void) => void;
  updateView: () => void;
  updatedTime?: Date;
  children: (state: State) => React.ReactNode;
}

const Container = ({
  title,
  view,
  submit,
  updateView,
  updatedTime,
  children
}: Props) => {

  const [open, setOpen] = useState<boolean>(true);
  const [edit, setEdit] = useState<boolean>(false);

  const handler = {
    toggle: () => {
      setOpen(!open);
    },
    edit: () => {
      setEdit(true);
    },
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      try {
        submit(values, () => {
          setEdit(false);
        });
      } catch (errors: any) {
        setErrors(errors);
      } finally {
        setSubmitting(false);
      }
    },
    updateView,
  };

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
                    {title}
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
                      <DateFormat date={updatedTime} format="YYYY-MM-DD HH:mm" />
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
              {children({ values, errors, setFieldValue, edit })}
            </Box>
          </Form>
        )}
      </Formik>
      <Divider />
    </Paper>
  );
};

export default Container;
