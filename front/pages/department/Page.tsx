import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Input,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import useDepartment from 'services/department/hook';
import { DepartmentQuery } from 'services/department/parameter';
import { departmentCategoryList, departmentCategoryName } from 'services/department/data';
import { Link } from 'react-router-dom';

type TableCellProperty = {
  key: string;
  label: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  style?: any;
}

const columns: TableCellProperty[] = [
  { key: 'no', label: 'No.', style: { minWidth: 50 } },
  { key: 'name', label: '부서명', style: { minWidth: 100 } },
  { key: 'category', label: '유형', style: { minWidth: 100 } },
  { key: 'parent', label: '상위 부서', style: { minWidth: 100 } },
  { key: 'userCount', label: '소속 유저 수', style: { minWidth: 100 } },
  { key: 'childrenCount', label: '하위 부서 수', style: { minWidth: 100 } },
];

const initFilter: DepartmentQuery = {
  size: 10,
  page: 0,
  category: departmentCategoryList,
  keywordType: 'by_name',
  keyword: '',
};

const DepartmentPage = () => {
  const {
    departmentState: {
      page,
    },
    getPage,
  } = useDepartment();
  const [filter, setFilter] = useState<DepartmentQuery>(initFilter);

  const handler = {
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
    clear: () => {
      setFilter(initFilter);
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
  };

  useEffect(() => {
    getPage(filter);
  }, [filter]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>
      <Box sx={{
        display: 'flex',
        width: '100%',
      }}>
        <h2>부서 목록</h2>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
      }}>
        <Formik
          initialValues={filter}
          onSubmit={handler.search}
          enableReinitialize
        >
          {({ values, isSubmitting, handleChange, handleSubmit, resetForm }) => (
            <Grid container spacing={1}>
              <Grid item sm={10}>
                <Form>
                  <Grid container spacing={1}>
                    <Grid item sm={12}>
                      <FormControl variant="standard" fullWidth>
                        <FormLabel component="legend">부서 유형</FormLabel>
                        <FormGroup row>
                          {departmentCategoryList.map((item) => (
                            <FormControlLabel
                              key={item as string}
                              control={
                                <Checkbox
                                  value={item}
                                  checked={values.category?.includes(item)}
                                  onChange={handleChange}
                                  name="category"
                                />
                              }
                              label={departmentCategoryName(item)}
                            />
                          ))}
                        </FormGroup>
                      </FormControl>
                    </Grid>
                    <Grid container spacing={1} item sm={12}>
                      <Grid item sm={4}>
                        <FormControl variant="standard" fullWidth>
                          <FormLabel component="legend">검색 대상</FormLabel>
                          <Select
                            value={values.keywordType}
                            onChange={handleChange}
                            name="keywordType"
                            placeholder="선택"
                          >
                            <MenuItem value="by_name">부서명</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item sm={8}>
                        <FormControl variant="standard" fullWidth>
                          <FormLabel component="legend">검색어</FormLabel>
                          <Input
                            type="text"
                            name="keyword"
                            value={values.keyword}
                            onChange={handleChange}
                            placeholder="검색어를 입력하세요"
                          />
                        </FormControl>
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
        maxHeight: 740,
        mb: '20px',
      }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(({ label, ...props }) => (
                  <TableCell {...props}>
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {page.content.map((item, i) => {
                const no: number = i + 1;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                    <TableCell>{no}</TableCell>
                    <TableCell>
                      <Link to={`/department/${item.id}`}>
                        {`${item.name}${departmentCategoryName(item.category)}`}
                      </Link>
                    </TableCell>
                    <TableCell>{departmentCategoryName(item.category)}</TableCell>
                    <TableCell>{item.parent ? `${item.parent.name}${departmentCategoryName(item.parent.category)}` : '-'}</TableCell>
                    <TableCell>{item.userCount ?? '-'}</TableCell>
                    <TableCell>{item.childrenCount ?? '-'}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        mb: '20px',
      }}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={page.content.length}
          rowsPerPage={filter.size}
          page={filter.page}
          onPageChange={handler.page}
          onRowsPerPageChange={handler.size}
        />
      </Box>
    </Paper>
  );
};

export default DepartmentPage;