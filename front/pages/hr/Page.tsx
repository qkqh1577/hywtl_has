import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Link,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import { usePersonnel } from 'services/personnel';
import {
  dateTypeList,
  hiredTypeList,
  keywordTypeList,
  sexList
} from 'services/personnel/view';
import dayjs from 'dayjs';
import { CheckboxField, DataField, DatePicker, DateFormat } from 'components';
import { PersonnelQuery } from 'services/personnel/parameter';

type TableCellProperty = {
  key: string;
  label: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  style?: any;
}
const columns: TableCellProperty[] = [
  { key: 'no', label: 'No.', style: { minWidth: 50 } },
  { key: 'name', label: '이름', style: { minWidth: 100 } },
  { key: 'sex', label: '성별', style: { minWidth: 50 } },
  { key: 'birthDate', label: '생년월일', style: { minWidth: 100 } },
  { key: 'hiredType', label: '입사 구분', style: { minWidth: 50 } },
  { key: 'hiredDate', label: '입사일', style: { minWidth: 100 } },
];

const initFilter: PersonnelQuery = {
  size: 10,
  page: 0,
};

const PersonnelPage = () => {
  const navigate = useNavigate();
  const {
    personnelState: { page },
    getPage
  } = usePersonnel();
  const [filter, setFilter] = useState<PersonnelQuery>(initFilter);

  const handler = {
    search: (values: any, { setSubmitting }: FormikHelpers<any>) => {
      setFilter({
        sex: arrangeList(values.sex, sexList),
        hiredType: arrangeList(values.hiredType, hiredTypeList),
        keyword: values.keyword,
        keywordType: arrangeList(values.keywordType, keywordTypeList),
        startDate: !values.startDate ? undefined : dayjs(values.startDate).format('YYYY-MM-DD'),
        endDate: !values.endDate ? undefined : dayjs(values.endDate).format('YYYY-MM-DD'),
        dateType: arrangeList(values.dateType, dateTypeList),
        size: values.size,
        page: values.page,
      });
      setSubmitting(false);
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
  };

  const arrangeList = <T, >(list: T[] | undefined, allList: T[]): T[] | undefined => {
    if (typeof list === 'undefined') {
      return undefined;
    }
    if (list.length === 0) {
      return [];
    }
    return list.filter(item => allList.includes(item)).length === allList.length ? undefined : list;
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
        <h2>인사 목록</h2>
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
            sex: filter.sex ?? sexList,
            hiredType: filter.hiredType ?? hiredTypeList,
            keyword: filter.keyword ?? '',
            keywordType: filter.keywordType ?? keywordTypeList,
            startDate: filter.startDate ?? null,
            endDate: filter.endDate ?? null,
            dateType: filter.dateType ?? dateTypeList,
          }}
          onSubmit={handler.search}
          enableReinitialize
        >
          {({
            values,
            errors,
            isSubmitting,
            setFieldValue,
            handleChange,
            handleSubmit,
            resetForm
          }) => (
            <Grid container spacing={1}>
              <Grid item sm={10}>
                <Form>
                  <Grid container spacing={1}>
                    <Grid item sm={12}>
                      <CheckboxField
                        name="sex"
                        label="성별"
                        value={values.sex}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        options={sexList}
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <CheckboxField
                        name="hiredType"
                        label="입사 구분"
                        value={values.hiredType}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        options={hiredTypeList}
                      />
                    </Grid>
                    <Grid container spacing={1} item sm={12}>
                      <Grid item sm={4}>
                        <FormControl variant="standard" fullWidth>
                          <FormLabel component="legend">검색 대상</FormLabel>
                          <Select
                            value={values.keywordType ?? keywordTypeList}
                            onChange={handleChange}
                            name="keywordType"
                            multiple
                          >
                            {keywordTypeList.map((item) => (
                              <MenuItem
                                key={item}
                                value={item}
                                selected={!values.keywordType || values.keywordType.includes(item)}
                              >
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
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
                    <Grid container spacing={1} item sm={12}>
                      <Grid item sm={4}>
                        <FormControl variant="standard" fullWidth>
                          <FormLabel component="legend">날짜 대상</FormLabel>
                          <Select
                            value={values.dateType ?? dateTypeList}
                            onChange={handleChange}
                            name="dateType"
                            multiple
                          >
                            {dateTypeList.map((item) => (
                              <MenuItem
                                key={item}
                                value={item}
                                selected={!values.dateType || values.dateType.includes(item)}
                              >
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item sm={4}>
                        <DatePicker
                          name="startDate"
                          label="시작일"
                          value={values.startDate ? dayjs(values.startDate).toDate() : null}
                          setFieldValue={setFieldValue}
                          errors={errors}
                        />
                      </Grid>
                      <Grid item sm={4}>
                        <DatePicker
                          name="endDate"
                          label="종료일"
                          value={values.endDate ? dayjs(values.endDate).toDate() : null}
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
              {page.content.map((personnel, i) => {
                const no: number = i + 1;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={personnel.id}>
                    <TableCell>{no}</TableCell>
                    <TableCell>
                      <Link
                        sx={{
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          navigate(`/hr/card/${personnel.id}`, { state: { filter } });
                        }}>
                        {personnel.name}
                      </Link>
                    </TableCell>
                    <TableCell>{personnel.basic.sex}</TableCell>
                    <TableCell>
                      <DateFormat date={personnel.basic.birthDate} />
                    </TableCell>
                    <TableCell>{personnel.company.hiredType}</TableCell>
                    <TableCell>
                      <DateFormat date={personnel.company.hiredDate} />
                    </TableCell>
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
        justifyContent: 'space-between',
      }}>
        <Grid container spacing={1}>
          <Grid item sm={8} sx={{
            display: 'flex',
            justifyContent: 'flex-start',
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
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default PersonnelPage;
