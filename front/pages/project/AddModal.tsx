import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import {
  DataField,
  Modal,
  UserSelector,
  useDialog
} from 'components';
import {
  ProjectBasicParameter,
  initProjectBasicView,
  useProject,
} from 'services/project';

const ProjectAddModal = () => {
  const navigate = useNavigate();
  const dialog = useDialog();
  const {
    state: { addModal },
    add,
    setAddModal
  } = useProject();

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

      const params: ProjectBasicParameter = {
        name,
        code,
        alias,
        salesManagerId,
        projectManagerId,
      };
      add(params, (data?) => {
        setSubmitting(false);
        if (data) {
          dialog.alert('등록되었습니다.', () => {
            setAddModal(false);
            navigate(`/project/${data.id}/basic`);
          });
        }
      });
    },
    close: () => {
      setAddModal(false);
    }
  };

  return (
    <Modal title="프로젝트 등록" open={addModal} onClose={handler.close}>
      <Formik enableReinitialize initialValues={initProjectBasicView} onSubmit={handler.submit}>
        {({ values, errors, isSubmitting, setFieldValue, handleSubmit, }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <DataField required
                  name="name"
                  label="프로젝트명"
                  value={values.name}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item sm={12}>
                <DataField required
                  name="code"
                  label="프로젝트 코드"
                  value={values.code}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item sm={12}>
                <DataField
                  name="alias"
                  label="프로젝트 닉네임"
                  value={values.alias}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  helperText="※최대 5글자"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <UserSelector required
                  name="salesManagerId"
                  label="영업 담당자"
                  value={values.salesManagerId}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <UserSelector required
                  name="projectManagerId"
                  label="담당 PM"
                  value={values.projectManagerId}
                  setFieldValue={setFieldValue}
                  errors={errors}
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
                    disabled={isSubmitting}
                    onClick={() => {
                      handleSubmit();
                    }}>
                    등록
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ProjectAddModal;
