import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Divider, Grid, IconButton, Paper } from '@mui/material';
import {
  Edit as EditIcon,
  DeleteForever as DeleteIcon,
  EditOff as ResetIcon,
} from '@mui/icons-material';
import { Form, Formik, FormikHelpers } from 'formik';
import { DataField, DateFormat } from 'components';
import {
  ProjectCommentAddParameter, ProjectCommentChangeParameter,
  ProjectCommentQuery
} from 'services/project_comment/parameter';
import useProjectComment from 'services/project_comment/hook';
import useUser from 'services/user/hook';
import ProjectComment from 'services/project_comment/entity';


const ProjectCommentList = () => {
  const { id: idString } = useParams<{ id: string | undefined }>();
  const id: number | undefined = !idString || Number.isNaN(+idString) ? undefined : +idString;
  if (!id) {
    return null;
  }

  const initFilter: ProjectCommentQuery = {
    projectId: id,
    page: 0,
    size: 20,
  };

  const {
    projectCommentState: { page },
    getPage,
    add,
    change,
    remove,
  } = useProjectComment();
  const {
    userState: { login }
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
          if (data) {
            window.alert('메모가 수정되었습니다.');
            setFilter(initFilter);
            setSelected(undefined);
            resetForm();
          }
          setSubmitting(false);
        });
      } else {
        const params: ProjectCommentAddParameter = {
          projectId: id,
          description,
        };
        add(params, (data) => {
          if (data) {
            window.alert('메모가 등록되었습니다.');
            setFilter(initFilter);
            resetForm();
          }
          setSubmitting(false);
        });
      }


    },
  };

  useEffect(() => {
    getPage(filter);
  }, [filter]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px', mb: '30px' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '100px',
        mb: '20px',
      }}>
        <Formik
          initialValues={{
            keyword: '',
          }}
          onSubmit={handler.search}
          enableReinitialize
        >
          {({ values, isSubmitting, setFieldValue, handleSubmit }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <DataField
                    name="keyword"
                    label="검색(작성자, 내용)"
                    setFieldValue={setFieldValue}
                    value={values.keyword}
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
                    검색
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
      <Divider />
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
          {({ values, isSubmitting, setFieldValue, handleSubmit }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <DataField
                    name="description"
                    label="메모 내용"
                    setFieldValue={setFieldValue}
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
                  >
                    {selected ? '수정' : '등록'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
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
              <Grid item sm={8}>
                <DateFormat date={item.createdTime} format="YYYY-MM-DD HH:mm" />
              </Grid>
              <Grid item sm={4}>
                {item.writer.name}
              </Grid>
              <Grid item sm={12}>
                {item.description}
              </Grid>
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
                      if (window.confirm('해당 메모를 삭제하시겠습니까?')) {
                         remove(item.id, () => {
                            window.alert('삭제되었습니다.');
                            setSelected(undefined);
                            setFilter(initFilter);
                         });
                      }
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
                      if (window.confirm('수정을 취소하시겠습니까?')) {
                        setSelected(undefined);
                      }
                    }}
                  >
                    <ResetIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );

};

export default ProjectCommentList;
