import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography
} from '@mui/material';
import {
  Edit as EditIcon,
  DeleteForever as DeleteIcon,
  EditOff as ResetIcon,
} from '@mui/icons-material';
import { Formik, FormikHelpers } from 'formik';
import { DataField, DateFormat, useDialog } from 'components';
import {
  ProjectComment,
  ProjectCommentAddParameter,
  ProjectCommentChangeParameter,
  ProjectCommentQuery,
  useProjectComment,
} from 'services/project_comment';
import { useUser } from 'services/user';


const ProjectCommentList = () => {
  const dialog = useDialog();
  const { id: idString } = useParams<{ id: string | undefined }>();
  const id: number | undefined = !idString || Number.isNaN(+idString) ? undefined : +idString;
  if (!id) {
    dialog.error('프로젝트가 선택되지 않았습니다.');
    return null;
  }

  const initFilter: ProjectCommentQuery = {
    projectId: id,
    page: 0,
    size: 20,
  };

  const {
    state: { page },
    getPage,
    add,
    change,
    remove,
  } = useProjectComment();
  const {
    state: { login }
  } = useUser();
  const [filter, setFilter] = useState<ProjectCommentQuery>(initFilter);
  const [selected, setSelected] = useState<ProjectComment | undefined>();

  const handler = {
    search: (values: any, { setSubmitting }: FormikHelpers<any>) => {
      setFilter({
        ...filter,
        page: 0,
        keyword: values.keyword || undefined,
      });
      setSubmitting(false);
    },
    submit: (values: any, { setSubmitting, setErrors, resetForm }: FormikHelpers<any>) => {
      const errors: any = {};

      const description: string = values.description;
      if (!description) {
        errors.description = '메모 내용 입력은 필수입니다.';
      }

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }

      if (selected) {
        const params: ProjectCommentChangeParameter = {
          id: selected.id,
          description,
        };
        change(params, (data) => {
          setSubmitting(false);
          if (data) {
            dialog.alert('메모가 수정되었습니다.', () => {
              setFilter(initFilter);
              setSelected(undefined);
              resetForm();
            });
          }
        });
      } else {
        const params: ProjectCommentAddParameter = {
          projectId: id,
          description,
        };
        add(params, (data) => {
          setSubmitting(false);
          if (data) {
            dialog.alert('메모가 등록되었습니다.', () => {
              setFilter(initFilter);
              resetForm();
            });
          }
        });
      }
    },
  };

  useEffect(() => {
    getPage(filter);
  }, [filter]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '15px' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '100px',
        mb: '10px',
      }}>
        <Formik
          initialValues={{
            description: selected?.description ?? '',
          }}
          onSubmit={handler.submit}
          enableReinitialize
        >
          {({ values, errors, isSubmitting, setFieldValue, handleSubmit }) => (
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <DataField
                  name="description"
                  label="메모 내용"
                  setFieldValue={setFieldValue}
                  errors={errors}
                  value={values.description}
                />
              </Grid>
              <Grid item sm={12}>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting}
                  onClick={() => {
                    handleSubmit();
                  }}
                  fullWidth
                >
                  작성완료
                </Button>
              </Grid>
            </Grid>
          )}
        </Formik>
      </Box>
      <Divider />
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '10px',
      }}>
        <Formik
          initialValues={{
            keyword: '',
          }}
          onSubmit={handler.search}
          enableReinitialize
        >
          {({ values, errors, setFieldValue, handleSubmit }) => (
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <DataField
                  name="keyword"
                  label="검색(작성자, 내용)"
                  setFieldValue={setFieldValue}
                  errors={errors}
                  value={values.keyword}
                  onKeyDown={(e) => {
                    if (e.key.toLowerCase() === 'enter') {
                      handleSubmit();
                    }
                  }}
                />
              </Grid>
            </Grid>
          )}
        </Formik>
      </Box>
      <Divider />
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}>
        <Grid container spacing={2}>
          {page.content.map((item) => (
            <Grid key={item.id} container spacing={1} item sm={12}>
              <Grid item sm={12} sx={{
                display: 'flex',
                alignContent: 'center',
                flexWrap: 'nowrap',

              }}>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  <DateFormat date={item.createdAt} format="YYYY-MM-DD HH:mm" />
                </Typography>
                <Typography>
                  {item.writer.name}
                </Typography>
                {!selected && login && item.writer.id === login.id && (
                  <Grid item sm={12}>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setSelected(item);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        dialog.remove('해당 메모를 삭제하시겠습니까?', () => {
                          remove(item.id, () => {
                            dialog.alert('삭제되었습니다.', () => {
                              setSelected(undefined);
                              setFilter(initFilter);
                            });
                          });
                        });
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                )}
                {selected && (
                  <Grid item sm={12}>
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        dialog.rollback('수정을 취소하시겠습니까?', () => {
                          setSelected(undefined);
                        });
                      }}
                    >
                      <ResetIcon />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
              <Grid item sm={4}>
              </Grid>
              <Grid item sm={12}>
                {item.description}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );

};

export default ProjectCommentList;
