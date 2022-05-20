import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Link, Paper } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { CheckboxField, DataField, Table } from 'components';
import {
  TestServiceTemplateQuery,
  testTypeList,
  useTestServiceTemplate,
} from 'services/standard_data/test_service_template';

const initQuery: TestServiceTemplateQuery = {
  testType: testTypeList,
};

const TestServiceTemplateList = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: {
      list
    },
    getList,
  } = useTestServiceTemplate();
  const [filter, setFilter] = useState<TestServiceTemplateQuery>(
    location.state
    && typeof (location.state as any)?.testServiceListFilter !== 'undefined'
      ? (location.state as any).testServiceListFilter as TestServiceTemplateQuery
      : initQuery
  );

  const handler = {
    toAdd: () => {
      navigate('/test-service/add', { state: { testServiceListFilter: filter } });
    },
    search: (values: any, { setSubmitting }: FormikHelpers<any>) => {
      setFilter({
        keywordType: values.keywordType ?? 'by_title',
        keyword: values.keyword ?? '',
        testType: values.testType ?? testTypeList,
      });
      setSubmitting(false);
    },
    clear: () => {
      setFilter(initQuery);
    }
  };

  useEffect(() => {
    getList(filter);
  }, [filter]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '50px',
        mb: '40px',
      }}>
        <h2>용역 항목 관리</h2>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
      }}>
        <Formik
          initialValues={{
            keywordType: filter.keywordType ?? 'by_title',
            keyword: filter.keyword ?? '',
            testType: filter.testType
          }}
          onSubmit={handler.search}
          enableReinitialize
        >
          {({
            values,
            errors,
            setFieldValue,
            isSubmitting,
            handleSubmit,
            resetForm
          }) => (
            <Grid container spacing={2}>
              <Grid item sm={10}>
                <Form>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      <CheckboxField
                        name="testType"
                        label="실험 타입"
                        value={values.testType}
                        options={testTypeList}
                        setFieldValue={setFieldValue}
                        errors={errors}
                      />
                    </Grid>
                    <Grid container spacing={2} item sm={12}>
                      <Grid item sm={4}>
                        <DataField
                          type="select"
                          name="keywordType"
                          label="검색 대상"
                          value={values.keywordType}
                          options={[
                            {
                              key: 'by_title',
                              text: '용역 항목'
                            },
                          ]}
                          setFieldValue={setFieldValue}
                          errors={errors}
                        />
                      </Grid>
                      <Grid item sm={8}>
                        <DataField
                          name="keyword"
                          label="검색어"
                          value={values.keyword}
                          setFieldValue={setFieldValue}
                          errors={errors}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              </Grid>
              <Grid item sm={2} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignContent: 'center'
              }}>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  검색
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    handler.clear();
                    resetForm();
                  }}
                >
                  초기화
                </Button>
              </Grid>
            </Grid>
          )}
        </Formik>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
      }}>
        <Table
          columns={[
            {
              label: 'No.',
              renderCell: (item, i) => i + 1
            }, {
              label: '실험 타입',
              renderCell: (item) => item.testType
            }, {
              label: '용역 항목',
              renderCell: (item) => (
                <Link
                  sx={{
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    navigate(`/test-service/${item.id}`, { state: { testServiceListFilter: filter } });
                  }}
                >
                  {item.title}
                </Link>
              )
            }, {
              label: '세부 항목',
              renderCell: (item) => `${item.detailCount}개`,
            }, {
              label: '총액',
              renderCell: (item) => item.totalPrice.toLocaleString(),
            }
          ]}
          title={`총 ${list?.length}건`}
          titleRightComponent={
            <Box>
              <Button
                color="primary"
                variant="contained"
              >
                순서 설정
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={handler.toAdd}
              >
                등록
              </Button>
            </Box>
          }
          list={list}
        />
      </Box>
    </Paper>
  );
};

export default TestServiceTemplateList;
