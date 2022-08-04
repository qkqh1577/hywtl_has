import React, {
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TablePagination,
} from '@mui/material';
import {
  Formik,
  Form,
  FormikHelpers
} from 'formik';
import dayjs from 'dayjs';
import {
  DateFormat,
  Table,
} from 'components';
import {
  PersonnelQuery,
  dateTypeList,
  hiredTypeList,
  keywordTypeList,
  sexList,
  usePersonnel,
} from 'services/personnel';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import CheckboxField from 'components/CheckboxField';
import DateField from 'components/DateField';

const initFilter: PersonnelQuery = {
  size: 10,
  page: 0,
};

const PersonnelPage = () => {
  const navigate = useNavigate();
  const {
          state: { page },
          getPage
        } = usePersonnel();
  const [filter, setFilter] = useState<PersonnelQuery>(initFilter);

  const handler = {
    search: (values: any,
             { setSubmitting }: FormikHelpers<any>
            ) => {
      setFilter({
        sex:         arrangeList(values.sex, sexList),
        hiredType:   arrangeList(values.hiredType, hiredTypeList),
        keyword:     values.keyword,
        keywordType: arrangeList(values.keywordType, keywordTypeList),
        startDate:   !values.startDate ? undefined : dayjs(values.startDate)
        .format('YYYY-MM-DD'),
        endDate:     !values.endDate ? undefined : dayjs(values.endDate)
        .format('YYYY-MM-DD'),
        dateType:    arrangeList(values.dateType, dateTypeList),
        size:        values.size,
        page:        values.page,
      });
      setSubmitting(false);
    },
    page:   (e: any,
             page: number
            ) => {
      setFilter({
        ...filter,
        page,
      });
    },
    size:   (e: any) => {
      setFilter({
        ...filter,
        page: 0,
        size: e.target.value
      });
    },
    clear:  () => {
      setFilter(initFilter);
    },
  };

  const arrangeList = <T, >(list: T[] | undefined,
                            allList: T[]
  ): T[] | undefined => {
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
        display:        'flex',
        justifyContent: 'space-between',
        width:          '100%',
        height:         '50px',
        mb:             '40px',
      }}>
        <h2>인사 목록</h2>
      </Box>
      <Box sx={{
        display: 'flex',
        width:   '100%',
        mb:      '40px',
      }}>
        <Formik enableReinitialize
          onSubmit={handler.search}
          initialValues={{
            page:        filter.page,
            size:        filter.size,
            sex:         filter.sex ?? sexList,
            hiredType:   filter.hiredType ?? hiredTypeList,
            keyword:     filter.keyword ?? '',
            keywordType: filter.keywordType ?? keywordTypeList,
            startDate:   filter.startDate ?? null,
            endDate:     filter.endDate ?? null,
            dateType:    filter.dateType ?? dateTypeList,
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
                      <CheckboxField
                        name="sex"
                        label="성별"
                        options={sexList}
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <CheckboxField
                        name="hiredType"
                        label="입사 구분"
                        options={hiredTypeList}
                      />
                    </Grid>
                    <Grid container spacing={2} item sm={12}>
                      <Grid item sm={4}>
                        <SelectField
                          multiple
                          label="검색 대상"
                          name="keywordType"
                          options={keywordTypeList}
                        />
                      </Grid>
                      <Grid item sm={8}>
                        <TextField
                          name="keyword"
                          label="검색어"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} item sm={12}>
                      <Grid item sm={4}>
                        <SelectField
                          multiple
                          label="날짜 대상"
                          name="dateType"
                          options={dateTypeList}
                        />
                      </Grid>
                      <Grid item sm={4}>
                        <DateField
                          name="startDate"
                          label="시작일"
                        />
                      </Grid>
                      <Grid item sm={4}>
                        <DateField
                          name="endDate"
                          label="종료일"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              </Grid>
              <Grid item
                sm={2}
                sx={{
                  display:        'flex',
                  flexDirection:  'column',
                  justifyContent: 'space-around',
                  alignContent:   'center'
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
        display:   'flex',
        width:     '100%',
        maxHeight: 740,
        mb:        '20px',
      }}>
        <Table
          list={page.content}
          columns={[
            {
              label:      'No.',
              renderCell: (item,
                           i
                          ) => (page.number * page.size) + i + 1,
            }, {
              label:      '이름',
              renderCell: (item) => (
                <Link onClick={() => {
                  navigate(`/hr/card/${item.id}`, { state: { filter } });
                }}>
                  {item.name}
                </Link>
              )
            }, {
              label:      '성별',
              renderCell: (item) => item.basic.sex
            }, {
              label:      '생년월일',
              renderCell: (item) => <DateFormat date={item.basic.birthDate} />
            }, {
              label:      '입사 구분',
              renderCell: (item) => item.company.hiredType
            }, {
              label:      '입사일',
              renderCell: (item) => <DateFormat date={item.company.hiredDate} />
            },
          ]}
        />
      </Box>
      <Box sx={{
        display:        'flex',
        width:          '100%',
        justifyContent: 'space-between',
      }}>
        <Grid container spacing={2}>
          <Grid item
            sm={8}
            sx={{
              display:        'flex',
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
        </Grid>
      </Box>
    </Paper>
  );
};

export default PersonnelPage;
