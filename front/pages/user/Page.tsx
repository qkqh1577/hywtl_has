import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Grid,
  Paper,
  TableContainer,
  Table,
  TablePagination,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box
} from '@mui/material';
import { Formik, FormikHelpers, Form } from 'formik';
import { DataField, CheckboxField } from 'components';
import {
  useUser,
  UserQuery,
  userRoleName,
  userRoleList,
} from 'services/user';

type TableCellProperty = {
  key: string;
  label: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  style?: any;
}
const columns: TableCellProperty[] = [
  { key: 'no', label: 'No.', style: { minWidth: 50 } },
  { key: 'userId', label: '아이디', style: { minWidth: 100 } },
  { key: 'name', label: '이름', style: { minWidth: 100 } },
  { key: 'email', label: '이메일', style: { minWidth: 100 } },
  { key: 'role', label: '권한', style: { minWidth: 100 } },
  { key: 'department', label: '소속', style: { minWidth: 100 } },
];

const initQuery: UserQuery = {
  page: 0,
  size: 10,
  sort: 'id,DESC',
  role: userRoleList,
  keywordType: 'by_username'
};

const UserPage = () => {
  const navigate = useNavigate();
  const { state: { page }, getPage } = useUser();
  const [filter, setFilter] = useState<UserQuery>(initQuery);

  const handler = {
    toAdd: () => {
      navigate('/user/add');
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
      setFilter(initQuery);
    },
    search: (values: any, { setSubmitting }: FormikHelpers<any>) => {
      setFilter({
        ...filter,
        page: 0,
        role: values.role,
        keywordType: values.keywordType ?? 'by_username',
        keyword: values.keyword ?? undefined,
      });
      setSubmitting(false);
    }
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
        <h2>유저 목록</h2>
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
            role: filter.role ?? userRoleList,
            keyword: filter.keyword ?? '',
            keywordType: filter.keywordType ?? 'by_username',
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
            <Grid container spacing={1}>
              <Grid item sm={10}>
                <Form>
                  <Grid container spacing={1}>
                    <Grid item sm={12}>
                      <CheckboxField
                        name="role"
                        label="권한"
                        value={userRoleList.map((item) =>
                          item as string)
                        }
                        options={userRoleList.map((item) => ({
                          key: item as string,
                          text: userRoleName(item)
                        }))}
                        setFieldValue={setFieldValue}
                        errors={errors}
                      />
                    </Grid>
                    <Grid container spacing={1} item sm={12}>
                      <Grid item sm={4}>
                        <DataField
                          type="select"
                          name="keywordType"
                          label="검색 대상"
                          value={values.keywordType}
                          options={[
                            {
                              key: 'by_username',
                              text: '아이디'
                            }, {
                              key: 'by_name',
                              text: '이름'
                            }, {
                              key: 'by_email',
                              text: '이메일'
                            }
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
              {page.content.map((user, i) => {
                const no: number = i + 1;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                    <TableCell>{no}</TableCell>
                    <TableCell>
                      <Link to={`/user/${user.id}`}>
                        {user.username}
                      </Link>
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{userRoleName(user.userRole)}</TableCell>
                    <TableCell>{user.departmentName}</TableCell>
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

export default UserPage;
