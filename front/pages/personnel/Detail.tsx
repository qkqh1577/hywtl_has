import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select
} from '@mui/material';
import usePersonnel from 'services/personnel/hook';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import FileInput from 'components/FileInput';

const PersonnelDetail = () => {
  const { id: idString } = useParams<{ id: string }>();
  const id = idString ? +idString : undefined;

  if (!id) {
    return null;
  }

  const {
    personnelState: {
      detail
    },
    getOne,
    clearOne
  } = usePersonnel();

  const handler = {
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      setSubmitting(false);
    },
  };

  useEffect(() => {
    getOne(id);
    return () => {
      clearOne();
    };
  }, [id]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px', mb: '30px' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '50px',
        mb: '40px',
      }}>
        <h2>인사 카드</h2>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
      }}>
        <Grid container spacing={1}>
          <Grid item sm={12}>
            <Formik
              initialValues={detail ?? {
                id,
                user: { id },
                basic: {
                  name: '',
                  engName: '',
                  birthDate: '',
                  sex: '',
                  image: undefined,
                }
              }}
              onSubmit={handler.submit}
            >
              {({ values, isSubmitting, setFieldValue, handleChange, handleSubmit }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      <h2>기본 정보</h2>
                    </Grid>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel htmlFor="params-basic.name">이름</InputLabel>
                      <Input
                        type="text"
                        id="params-basic.name"
                        value={values.basic.name}
                        disabled
                      />
                    </FormControl>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel htmlFor="params-basic.engName">영문명</InputLabel>
                      <Input
                        type="text"
                        id="params-basic.engName"
                        value={values.basic.engName}
                        onChange={handleChange}
                        placeholder="영문명을 입력하세요"
                      />
                      <ErrorMessage name="basic.engName" />
                    </FormControl>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel htmlFor="params-basic.birthDate">영문명</InputLabel>
                      <Input
                        type="text"
                        id="params-basic.birthDate"
                        value={values.basic.birthDate}
                        onChange={handleChange}
                        placeholder="생년월일을 입력하세요"
                      />
                      <ErrorMessage name="basic.birthDate" />
                    </FormControl>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel id="params-basic.sex-label">성별</InputLabel>
                      <Select
                        labelId="params-basic.sex-label"
                        id="params-basic.sex"
                        value={values.basic.sex}
                        onChange={handleChange}
                      >
                        <MenuItem value="남">남</MenuItem>
                        <MenuItem value="여">남</MenuItem>
                      </Select>
                      <ErrorMessage name="basic.sex" />
                    </FormControl>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FileInput
                      id="basic.image"
                      fileItem={values.basic.image}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
export default PersonnelDetail;
