import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select
} from '@mui/material';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import useDepartment from 'services/department/hook';
import { departmentCategoryList, departmentCategoryName } from 'services/department/data';
import { DepartmentCategory } from 'services/department/Department';
import { DepartmentAddParameter } from 'services/department/parameter';

const DepartmentAddForm = () => {
  const navigate = useNavigate();
  const {
    departmentState: {
      list
    },
    getAll,
    add,
  } = useDepartment();

  const handler = {
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      const errors: any = {};
      const name: string = values.name;
      if (!name) {
        errors.name = '부서명 입력은 필수입니다.';
      }
      const category: DepartmentCategory = values.category;
      if (!category) {
        errors.category = '부서 유형 선택은 필수입니다.';
      }
      const parentId: number | undefined = values.parentId === 'root' ? undefined : values.parentId;
      if (!values.parentId) {
        errors.parentId = '상위 부서 선택은 필수입니다.';
      }
      const memo: string | undefined = values.memo || undefined;

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }

      const params: DepartmentAddParameter = {
        name,
        category,
        parentId,
        memo,
      };

      add(params, (data) => {
        if (data) {
          window.alert('저장하였습니다.');
          navigate('/department');
        }
        setSubmitting(false);
      });
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '50px',
        mb: '40px',
      }}>
        <h2>부서 등록</h2>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
      }}>
        <Grid container spacing={1}>
          <Grid item sm={12}>
            <Formik
              initialValues={{
                name: '',
                category: '',
                parentId: '',
                memo: ''
              }}
              enableReinitialize
              onSubmit={handler.submit}
            >
              {({ values, isSubmitting, handleChange, handleSubmit }) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item sm={12}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="params-name">부서명</InputLabel>
                        <Input
                          type="text"
                          id="params-name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          required
                        />
                        <ErrorMessage name="name" />
                      </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="params-category-label">부서 유형</InputLabel>
                        <Select
                          labelId="params-category-label"
                          id="params-category"
                          name="category"
                          value={values.category}
                          onChange={handleChange}
                          required
                        >
                          <MenuItem value=""><em>선택</em></MenuItem>
                          {departmentCategoryList.map((category) => (
                            <MenuItem key={category} value={category}>
                              {departmentCategoryName(category)}
                            </MenuItem>
                          ))}
                        </Select>
                        <ErrorMessage name="category" />
                      </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="params-parentId-label">상위 부서</InputLabel>
                        <Select
                          labelId="params-parentId-label"
                          id="params-parentId"
                          name="parentId"
                          value={values.parentId}
                          onChange={handleChange}
                          disabled={values.category === 'COMPANY'}
                          required={values.category !== 'COMPANY'}
                        >
                          <MenuItem value=""><em>선택</em></MenuItem>
                          <MenuItem value="root">최상위</MenuItem>
                          {list.map((department) => (
                            <MenuItem key={department.id} value={department.id}>
                              {department.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <ErrorMessage name="parentId" />
                      </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="params-memo">설명</InputLabel>
                        <Input
                          type="text"
                          id="params-memo"
                          name="memo"
                          value={values.memo}
                          onChange={handleChange}
                        />
                        <ErrorMessage name="memo" />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item sm={12}>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      width: '100%',
                      mt: '40px',
                    }}>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          navigate(-1);
                        }}
                      >
                        취소
                      </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        disabled={isSubmitting}
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        저장
                      </Button>
                    </Box>

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

export default DepartmentAddForm;
