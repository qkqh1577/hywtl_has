import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Input
} from '@mui/material';
import { Formik, FormikHelpers, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import useCompany from 'services/company/hook';
import { CompanyQuery } from 'services/company/parameters';

type TableCellProperty = {
  key: string;
  label: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  style?: any;
}

const columns: TableCellProperty[] = [
  { key: 'no', label: 'No.', style: { minWidth: 50 }, align: 'center' },
  { key: 'name', label: '업체명', style: { minWidth: 100 }, align: 'center' },
  { key: 'representativeName', label: '대표명', style: { minWidth: 100 }, align: 'center' },
  { key: 'companyNumber', label: '사업자번호', style: { minWidth: 100 }, align: 'center' },
  { key: 'address', label: '주소', style: { minWidth: 100 }, align: 'center' },
  { key: 'phone', label: '대표 전화번호', style: { minWidth: 100 }, align: 'center' },
  { key: 'managerCount', label: '담당자', style: { minWidth: 100 }, align: 'center' },
  { key: 'projectCount', label: '참여 프로젝트 총 개수', style: { minWidth: 100 }, align: 'center' },
  { key: 'memo', label: '비고', style: { minWidth: 100 }, align: 'center' },
];

const initFilter: CompanyQuery = {
  page: 0,
  size: 10,
  sort: 'id,DESC',
  keywordType: 'by_name',
  keyword: '',
};

const CompanyPage = () => {
  const navigate = useNavigate();

  const { companyState: { page }, getPage } = useCompany();
  const [filter, setFilter] = useState<CompanyQuery>(initFilter);

  const handler = {
    toAdd: () => {
      navigate('/company/add');
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
          initialValues={filter}
          onSubmit={handler.search}
          enableReinitialize
        >
          {({ values, isSubmitting, handleChange, handleSubmit, resetForm }) => (
            <Grid container spacing={1}>
              <Grid item sm={10}>
                <Form>
                  <Grid container spacing={1}>
                    <Grid container spacing={1} item sm={12}>
                      <Grid item sm={4}>
                        <FormControl variant="standard" fullWidth>
                          <FormLabel component="legend">검색 대상</FormLabel>
                          <Select
                            value={values.keywordType}
                            onChange={handleChange}
                            name="keywordType"
                          >
                            <MenuItem value="by_name">업체명</MenuItem>
                            <MenuItem value="by_representativeName">대표명</MenuItem>
                            <MenuItem value="by_companyNumber">사업자번호</MenuItem>
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
              {page.content.map((company, i) => {
                const no: number = i + 1 + page.number * page.size;
                return (
                  <TableRow>
                    <TableCell align="center">{no}</TableCell>
                    <TableCell align="center">
                      <Link
                        sx={{
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          navigate(`/company/${company.id}`);
                        }}>
                        {company.name}
                      </Link>
                    </TableCell>
                    <TableCell align="center">{company.representativeName}</TableCell>
                    <TableCell align="center">{company.companyNumber}</TableCell>
                    <TableCell align="center">{company.address}</TableCell>
                    <TableCell align="center">{company.phone}</TableCell>
                    <TableCell align="center">{company.managerCount}명</TableCell>
                    <TableCell align="center">{}</TableCell>
                    <TableCell align="center">{company.memo}</TableCell>
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
        <Grid container spacing={1}>
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

export default CompanyPage;