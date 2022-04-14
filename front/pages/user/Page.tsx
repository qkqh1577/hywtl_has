import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Grid,
  MenuItem,
  Select,
  Paper,
  TableContainer,
  Table,
  TablePagination,
  TableHead,
  TableBody,
  TableRow,
  TableCell, Checkbox, FormLabel, Box, FormControl, FormGroup, FormControlLabel, Input
} from '@mui/material';
import { Formik, FormikHelpers, Form } from 'formik';
import useUser from 'services/user/hook';
import { UserQuery } from 'services/user/parameter';
import { userRoleName, userRoleList } from 'services/user/data';

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
  const { userState: { page }, getPage } = useUser();
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
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>
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
                        <FormLabel component="legend">권한</FormLabel>
                        <FormGroup row>
                          {userRoleList.map((item) => (
                            <FormControlLabel
                              key={item as string}
                              control={
                                <Checkbox
                                  value={item}
                                  checked={values.role.includes(item)}
                                  onChange={handleChange}
                                  name="role"
                                />
                              }
                              label={userRoleName(item)}
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
                          >
                            <MenuItem value="by_username">아이디</MenuItem>
                            <MenuItem value="by_name">이름</MenuItem>
                            <MenuItem value="by_email">이메일</MenuItem>
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
              count={page.content.length}
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
