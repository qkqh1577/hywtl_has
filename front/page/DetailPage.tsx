import React, { useEffect, useState } from 'react';
import useDepartment from 'department/hook';
import { Box, Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import { DepartmentChangeParameter, DepartmentQuery } from 'department/parameter';
import { makeStyles } from '@mui/styles';
import { departmentCategoryList, departmentCategoryName } from 'department/data';
import { DepartmentCategory } from 'department/Department';
import { Form, Formik, FormikHelpers } from 'formik';

const useStyles = makeStyles(() => ({
  component: {
    alignContent: 'flex-start',
  }
}));
const DetailPage = () => {
  const classes = useStyles();

  const {
    departmentState: {
      selectedId: departmentId,
      detail: departmentDetail,
    },
    getPage: getDepartmentPage,
    getOne: getDepartment,
    clearOne: clearDepartment,
    change: changeDepartment,
    changeParent: changeDepartmentParent,
    selectOne: selectDepartment
  } = useDepartment();

  const [departmentParams, setDepartmentParams] = useState<{
    name: string;
    category: DepartmentCategory | 'unselect';
    memo?: string;
    seq?: number;
  }>({
    name: '',
    category: 'unselect',
  });

  const submitHandler = (values: any, { setSubmitting }: FormikHelpers<any>) => {
    if (!departmentDetail) {
      window.alert('부서가 선택되지 않았습니다.');
      return;
    }
    if (values.category === 'unselect') {
      window.alert('부서 유형이 선택되지 않았습니다.');
      return;
    }
    const params: DepartmentChangeParameter = {
      id: departmentDetail.id,
      name: values.name ?? departmentDetail.name,
      category: values.category ?? departmentDetail.name,
      seq: values.seq ?? departmentDetail.seq,
      memo: values.memo ?? departmentDetail.memo,
    };

    changeDepartment(params, (success) => {
      setSubmitting(false);
      if (success) {
        getDepartmentPage({
          size: 100,
          page: 0,
          category: [],
        });
        selectDepartment(undefined);
        clearDepartment();
      }
    });
  };

  useEffect(() => {
    if (typeof departmentId === 'number') {
      getDepartment(departmentId);
    }
    return () => {
      clearDepartment();
    };
  }, [departmentId]);

  useEffect(() => {
    if (departmentDetail) {
      setDepartmentParams({
        ...departmentDetail
      });
    }
  }, [departmentDetail]);

  return (
    <Grid item container spacing={3} className={classes.component}>
      {!departmentDetail && (
        <Grid>부서 또는 유저를 선택하여 주십시오.</Grid>
      )}
      {departmentDetail && (
        <>
          <Grid item sm={12}>
            {departmentDetail && (<h2>부서 상세</h2>)}
          </Grid>

          <Formik
            initialValues={departmentParams}
            enableReinitialize
            onSubmit={submitHandler}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form
                autoComplete="off"
              >
                <Grid item sm={6}>
                  <TextField
                    type="text"
                    name="name"
                    placeholder="부서명을 입력하세요"
                    label="부서명"
                    value={values.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    id="category"
                    select
                    type="select"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    placeholder="부서 유형을 선택하세요"
                    label="부서 유형"
                    required
                  >
                    <MenuItem value="unselect">선택</MenuItem>
                    {departmentCategoryList.map(category => (
                      <MenuItem key={category} value={category}>
                        {departmentCategoryName(category)}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item sm={12}>
                  <Button
                    onClick={() => {
                      selectDepartment(undefined);
                      clearDepartment();
                    }}
                  >
                    취소
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    저장
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Grid>
  );
};

export default DetailPage;