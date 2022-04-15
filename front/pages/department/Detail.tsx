import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { DepartmentCategory, ListDepartment } from 'services/department/entity';
import { DepartmentChangeParameter } from 'services/department/parameter';

const DepartmentDetail = () => {
  const navigate = useNavigate();
  const { id: idString } = useParams<{ id: string }>();
  const id = idString ? +idString : undefined;
  if (typeof id === 'undefined' || Number.isNaN(id)) {
    window.alert('잘못된 접근입니다.');
    navigate('/department');
    return null;
  }

  const {
    departmentState: {
      list,
      detail
    },
    getAll,
    getOne,
    clearOne,
    change,
  } = useDepartment();

  const handler = {
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      if (!detail) {
        window.alert('잘못된 접근입니다.');
        return;
      }

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

      const params: DepartmentChangeParameter = {
        id: detail.id,
        name,
        category,
        parentId,
        memo,
      };

      change(params, (data) => {
        if (data) {
          window.alert('저장하였습니다.');
        }
        setSubmitting(false);
      });
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    getOne(id);
    return () => {
      clearOne();
    };
  }, [id]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '50px',
        mb: '40px',
      }}>
        <h2>부서 상세 정보</h2>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
      }}>
        <Grid container spacing={1}>
          <Grid item sm={12}>
            {detail && (
              <Formik
                initialValues={{
                  id: detail.id,
                  name: detail.name,
                  category: detail.category,
                  parentId: detail.parentId ?? '',
                  memo: detail.memo ?? ''
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
                            <MenuItem value="root">최상위</MenuItem>
                            {list
                            .filter((department) => department.id !== detail.id)
                            .filter((department) => {
                              if (!department.parentId) {
                                return true;
                              }
                              const getAncestorIdList = (sourceId: number, temp: number[]): number[] => {
                                const target: ListDepartment | undefined = list.find(item => item.id === sourceId);
                                if (target) {
                                  if (target.parentId) {
                                    return [target.id, ...getAncestorIdList(target.parentId, temp)];
                                  }
                                  return [target.id, ...temp];
                                }
                                return temp;
                              };

                              const ancestorIdList = getAncestorIdList(department.parentId, []);
                              return !ancestorIdList.includes(detail.id);
                            }).map((department) => (
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
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default DepartmentDetail;
