import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Paper,
  Link,
  TablePagination,
} from '@mui/material';
import { Formik, FormikHelpers, Form } from 'formik';
import { BusinessQuery, useBusiness } from 'services/business';
import { DataField, Table } from 'components';

const initFilter = {
  page: 0,
  size: 10,
  sort: 'id,DESC',
  keywordType: 'by_name',
  keyword: '',
};

const Page = () => {
  const navigate = useNavigate();

  const {
    state: {
      page
    },
    getPage
  } = useBusiness();

  const [filter, setFilter] = useState<BusinessQuery>(initFilter);

  const handler = {
    toAdd: () => {
      navigate('/business-management/add');
    },
    page: (e: any, page: number) => {
      setFilter({
        ...filter,
        page,
      });
    },
    size: (e: any) => {
      setFilter({
        ...filter,
        page: 0,
        size: e.target.value
      });
    },
    search: (values: any, { setSubmitting }: FormikHelpers<any>) => {
      setFilter({
        ...filter,
        page: 0,
        keywordType: values.keywordType ?? 'by_name',
        keyword: values.keyword ?? undefined,
      });
      setSubmitting(false);
    },
    clear: () => {
      setFilter(initFilter);
    },
  };

  useEffect(() => {
    getPage(filter);
  }, [filter]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '50px',
        mb: '40px',
      }}>
        <h2>업체 목록</h2>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
      }}>
        <Formik
          initialValues={{
            page: filter.page,
            size: filter.size,
            sort: filter.sort,
            keyword: filter.keyword ?? initFilter.keyword,
            keywordType: filter.keywordType ?? initFilter.keywordType,
          }}
          onSubmit={handler.search}
          enableReinitialize
        >
          {({ values, isSubmitting, setFieldValue, errors, handleSubmit, resetForm }) => (
            <Grid container spacing={2}>
              <Grid item sm={10}>
                <Form>
                  <Grid container spacing={2}>
                    <Grid container spacing={2} item sm={12}>
                      <Grid item sm={4}>
                        <DataField
                          type="select"
                          name="keywordType"
                          label="검색 대상"
                          value={values.keywordType}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          options={[
                            {
                              key: 'by_name',
                              text: '업체명'
                            }, {
                              key: 'by_representativeName',
                              text: '대표명'
                            }, {
                              key: 'by_registrationNumber',
                              text: '사업자번호'
                            }
                          ]}
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
                alignItems: 'flex-end'
              }}>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ width: '80px' }}
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
                  style={{ width: '80px', marginTop: '5px' }}
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
        maxHeight: 740,
        mb: '20px',
      }}>
        <Table
          columns={[
            {
              label: 'No.',
              renderCell: (item, i) => i + 1 + page.number * page.size
            }, {
              label: '업체명',
              renderCell: (item) => (
                <Link
                  onClick={() => {
                    navigate(`/business-management/${item.id}`);
                  }}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  {item.name}
                </Link>
              )
            }, {
              label: '대표명',
              renderCell: (item) => item.representativeName,
            }, {
              label: '사업자번호',
              renderCell: (item) => item.registrationNumber,
            }, {
              label: '주소',
              renderCell: (item) => item.address,
            }, {
              label: '대표 전화번호',
              renderCell: (item) => item.officePhone,
            }, {
              label: '담당자 수',
              renderCell: (item) => item.managerCount,
            }, {
              label: '참여 프로젝트 총 개수',
              renderCell: (item) => item.projectCount ?? '-',
            }, {
              label: '비고',
              renderCell: (item) => item.memo,
            }
          ]}
          list={page.content}
        />
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        mb: '20px',
      }}>
        <Grid container spacing={2}>
          <Grid item sm={8} sx={{
            display: 'flex',
            justifyContent: 'flex-start',
          }}>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={page.totalElements}
              rowsPerPage={filter.size}
              page={filter.page}
              onPageChange={handler.page}
              onRowsPerPageChange={handler.size}
            />
          </Grid>
          <Grid item sm={4}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              mt: '40px',
            }}>
              <Button
                color="primary"
                variant="contained"
                onClick={handler.toAdd}
              >
                등록
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Page;