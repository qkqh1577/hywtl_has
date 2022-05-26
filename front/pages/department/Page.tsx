import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Paper,
  TablePagination,
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { CheckboxField, DataField, Table, TableCellProperty } from 'components';
import {
  DepartmentQuery,
  DepartmentShort,
  departmentCategoryList,
  departmentCategoryName,
  useDepartment,
} from 'services/department';

const columns: TableCellProperty<DepartmentShort>[] = [
  {
    label: 'No.',
    renderCell: (item, i) => i + 1,
  },
  {
    label: '부서명',
    renderCell: (item) =>
      <Link to={`/department/${item.id}`}>
        {item.name}
      </Link>
  },
  {
    label: '유형',
    renderCell: (item) => departmentCategoryName(item.category)
  },
  {
    label: '상위 부서',
    renderCell: (item) => item.parent ? item.parent.name : '-'
  },
  {
    label: '소속 유저 수',
    renderCell: (item) => item.userCount ?? '-',
  },
  {
    label: '하위 부서 수',
    renderCell: (item) => item.childrenCount ?? '-',
  },
];

const initFilter: DepartmentQuery = {
  size: 10,
  page: 0,
  category: departmentCategoryList,
  keywordType: 'by_name',
  keyword: '',
};

const DepartmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: {
      page,
    },
    getPage,
  } = useDepartment();
  const [filter, setFilter] = useState<DepartmentQuery>((location?.state as any)?.filter ?? initFilter);

  const handler = {
    toAdd: () => {
      navigate('/department/add');
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
    clear: () => {
      setFilter(initFilter);
    },
    search: (values: any, { setSubmitting }: FormikHelpers<any>) => {
      setFilter({
        ...filter,
        page: 0,
        category: values.category,
        keywordType: values.keywordType ?? 'by_name',
        keyword: values.keyword ?? undefined,
      });
      setSubmitting(false);
    },
  };

  useEffect(() => {
    getPage(filter);
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
        <h2>부서 목록</h2>
        <Button onClick={() => {
          navigate('/department-tree', { state: { filter } });
        }}>
          트리로 보기
        </Button>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
      }}>
        <Formik enableReinitialize initialValues={filter} onSubmit={handler.search}>
          {({ values, errors, isSubmitting, setFieldValue, handleSubmit, resetForm }) => (
            <Grid container spacing={2}>
              <Grid item sm={10}>
                <Form>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      <CheckboxField
                        name="category"
                        label="부서 유형"
                        value={values.category ?? []}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        options={departmentCategoryList.map(item => ({
                          key: item as string,
                          text: departmentCategoryName(item),
                        }))}
                      />
                    </Grid>
                    <Grid container spacing={2} item sm={12}>
                      <Grid item sm={4}>
                        <DataField
                          type="select"
                          name="keywordType"
                          label="검색 대상"
                          value={values.keywordType ?? ''}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          options={[
                            {
                              key: 'by_name',
                              text: '부서명',
                            }
                          ]}
                        />
                      </Grid>
                      <Grid item sm={8}>
                        <DataField
                          name="keyword"
                          label="검색어"
                          value={values.keyword ?? ''}
                          setFieldValue={setFieldValue}
                          errors={errors}
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
        maxHeight: 740,
        mb: '20px',
      }}>
        <Table columns={columns} list={page.content} />
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        mb: '20px',
      }}>
        <Grid container spacing={2}>
          <Grid item
            sm={8}
            sx={{
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
              <Button onClick={handler.toAdd}>
                등록
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default DepartmentPage;