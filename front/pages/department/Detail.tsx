import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { DataField, useDialog } from 'components';
import {
  DepartmentCategory,
  DepartmentParameter,
  DepartmentShort,
  departmentCategoryList,
  departmentCategoryName,
  useDepartment,
} from 'services/department';

const DepartmentDetail = () => {
  const { id: idString } = useParams<{ id: string }>();
  const id = idString ? +idString : undefined;

  const navigate = useNavigate();
  const dialog = useDialog();

  const {
    state: {
      list,
      detail
    },
    getAll,
    getOne,
    clearOne,
    upsert,
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
      const memo: string | undefined = values.memo || undefined;

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }

      const params: DepartmentParameter = {
        id: detail?.id,
        name,
        category,
        parentId,
        memo,
      };

      upsert(params, (data) => {
        setSubmitting(false);
        if (data) {
          dialog.alert('저장하였습니다.', id ? undefined : '/department');
        }
      });
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (id) {
      getOne(id);
    }
    return () => {
      clearOne();
    };
  }, [id]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '50px',
        mb: '40px',
      }}>
        <h2>{id ? '부서 상세 정보' : '부서 등록'}</h2>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
      }}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Formik enableReinitialize
              onSubmit={handler.submit}
              initialValues={{
                name: detail?.name ?? '',
                category: detail?.category ?? '',
                parentId: detail?.parentId ?? '',
                memo: detail?.memo ?? ''
              }}>
              {({ values, errors, isSubmitting, setFieldValue, handleSubmit }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      <DataField required
                        name="name"
                        label="부서명"
                        value={values.name}
                        setFieldValue={setFieldValue}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <DataField required
                        type="select"
                        name="category"
                        label="부서 유형"
                        value={values.category}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        options={departmentCategoryList.map((category) => ({
                          key: category as string,
                          text: departmentCategoryName(category)
                        }))}
                        onChange={(e, value) => {
                          if (value === 'COMPANY') {
                            setFieldValue('parentId', '');
                          }
                        }}
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <DataField
                        type="select"
                        name="parentId"
                        label="상위 부서"
                        value={values.parentId}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        disabled={values.category === 'COMPANY'}
                        required={values.category !== 'COMPANY'}
                        options={[
                          {
                            key: 'root',
                            text: '최상위'
                          }, ...(
                            detail ? list
                            .filter((department) => department.id !== detail.id)
                            .filter((department) => {
                              if (!department.parentId) {
                                return true;
                              }
                              const getAncestorIdList = (sourceId: number, temp: number[]): number[] => {
                                const target: DepartmentShort | undefined = list.find(item => item.id === sourceId);
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
                            }) : list).map((department) => ({
                            key: department.id,
                            text: department.name
                          }))
                        ]}
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <DataField
                        name="memo"
                        label="설명"
                        value={values.memo}
                        setFieldValue={setFieldValue}
                        errors={errors}
                      />
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
                        onClick={() => {
                          navigate(-1);
                        }}>
                        취소
                      </Button>
                      <Button
                        disabled={isSubmitting}
                        onClick={() => {
                          handleSubmit();
                        }}>
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

export default DepartmentDetail;
