import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Link, Paper } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { DataField, Table } from 'components';
import {
  TestServiceTemplateQuery,
  testTypeList,
  useTestServiceTemplate,
} from 'services/standard_data/test_service_template';
import TestServiceTemplateSeqModal from 'pages/standard_data/test_service/SeqModal';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';

const initQuery: TestServiceTemplateQuery = {
  testType: testTypeList,
};

const TestServiceTemplateList = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: {
      list,
      seqModal
    },
    getList,
    setSeqModal,
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
    openSeqModal: () => {
      setSeqModal(true);
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
    if (!seqModal) {
      getList(filter);
    }
  }, [filter, seqModal]);

  return (
    <>
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
          <Formik enableReinitialize
            onSubmit={handler.search}
            initialValues={{
              keywordType: filter.keywordType ?? 'by_title',
              keyword: filter.keyword ?? '',
              testType: filter.testType
            }}>
            {({
              isSubmitting,
              handleSubmit,
              resetForm
            }) => (
              <Grid container spacing={2}>
                <Grid item sm={10}>
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item sm={12}>
                        <DataField
                          type="checkbox"
                          name="testType"
                          label="실험 타입"
                          options={testTypeList}
                        />
                      </Grid>
                      <Grid container spacing={2} item sm={12}>
                        <Grid item sm={4}>
                          <SelectField
                            name="keywordType"
                            label="검색 대상"
                            options={[
                              {
                                key: 'by_title',
                                text: '용역 항목'
                              },
                            ]}
                          />
                        </Grid>
                        <Grid item sm={8}>
                          <TextField
                            name="keyword"
                            label="검색어"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Form>
                </Grid>
                <Grid item
                  sm={2}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignContent: 'center'
                  }}>
                  <Button
                    disabled={isSubmitting}
                    onClick={() => {
                      handleSubmit();
                    }}>
                    검색
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => {
                      handler.clear();
                      resetForm();
                    }}>
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
            list={list}
            title={`총 ${list?.length}건`}
            titleRightComponent={
              <Box>
                <Button onClick={handler.openSeqModal}>
                  순서 설정
                </Button>
                <Button onClick={handler.toAdd}>
                  등록
                </Button>
              </Box>
            }
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
                  <Link onClick={() => {
                    navigate(`/test-service/${item.id}`, { state: { testServiceListFilter: filter } });
                  }}>
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
          />
        </Box>
      </Paper>
      <TestServiceTemplateSeqModal />
    </>
  );
};

export default TestServiceTemplateList;
