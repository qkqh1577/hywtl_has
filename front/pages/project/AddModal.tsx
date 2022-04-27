import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, IconButton, Modal, Paper } from '@mui/material';
import {
  Close as CloseIcon
} from '@mui/icons-material';
import { Form, Formik, FormikHelpers } from 'formik';
import { DataField } from 'components';
import { initProjectBasic } from 'services/project/view';
import useProject from 'services/project/hook';
import { ProjectAddParameter } from 'services/project/parameter';
import userApi from 'services/user/api';
import { ListUser } from 'services/user/entity';

const ProjectAddModal = () => {
  const navigate = useNavigate();
  const {
    projectState: { addModal },
    add,
    setAddModal
  } = useProject();
  const [userList, setUserList] = useState<ListUser[]>([]);

  const handler = {
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
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

      const params: ProjectAddParameter = {
        name,
        code,
        alias,
        status: 'TEMPLATE',
        salesManagerId,
        projectManagerId,
      };
      add(params, (data?) => {
        if (data) {
          window.alert('등록되었습니다.');
          setAddModal(false);
          navigate(`/project/${data.id}/basic`);
        }
        setSubmitting(false);
      });
    },
    close: () => {
      setAddModal(false);
    }
  };

  useEffect(() => {
    if (addModal) {
      userApi.getAll().then(setUserList);
    }
  }, [addModal]);

  return (
    <Modal
      open={addModal}
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
          <h2>프로젝트 등록</h2>
          <IconButton
            color="primary"
            onClick={handler.close}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ mb: '20px' }}>
          <Formik
            initialValues={initProjectBasic}
            onSubmit={handler.submit}
            enableReinitialize
          >
            {({ values, isSubmitting, setFieldValue, handleSubmit, }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <DataField
                      name="name"
                      label="프로젝트명"
                      value={values.name}
                      setFieldValue={setFieldValue}
                      required
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <DataField
                      name="code"
                      label="프로젝트 코드"
                      value={values.code}
                      setFieldValue={setFieldValue}
                      required
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <DataField
                      name="alias"
                      label="프로젝트 닉네임"
                      value={values.alias}
                      setFieldValue={setFieldValue}
                      helperText="※최대 5글자"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <DataField
                      type="select"
                      name="salesManagerId"
                      label="영업 담당자"
                      value={values.salesManagerId}
                      setFieldValue={setFieldValue}
                      options={userList.map((item) => ({
                        key: item.id,
                        value: item.name,
                      }))}
                      required
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <DataField
                      type="select"
                      name="projectManagerId"
                      label="담당 PM"
                      value={values.projectManagerId}
                      setFieldValue={setFieldValue}
                      options={userList.map((item) => ({
                        key: item.id,
                        value: item.name,
                      }))}
                      required
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      width: '100%',
                      mt: '40px',
                    }}>
                      <Button
                        color="primary"
                        variant="contained"
                        disabled={isSubmitting}
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        등록
                      </Button>
                    </Box>
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

export default ProjectAddModal;
