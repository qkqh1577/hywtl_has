import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Paper,
  TableContainer,
  Table,
  TablePagination,
  TableHead,
  TableBody,
  TableRow,
  TableCell, Checkbox, FormLabel, Box, FormControl, FormGroup, FormControlLabel
} from '@mui/material';
import { Formik, FormikHelpers, Form } from 'formik';
import useUser from 'services/user/hook';
import { UserQuery } from 'services/user/parameter';
import { userRoleName, userRoleList } from 'services/user/data';

//https://mui.com/components/tables/
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

export function UserPage() {
  const navigate = useNavigate();
  const { userState: { page }, getPage } = useUser();
  const [filter, setFilter] = useState<UserQuery>({
    page: 0,
    size: 10,
    sort: 'id,DESC',
    role: userRoleList,
    keywordType: 'by_username'
  });
  const handler = {
    move: {
      add: () => {
        navigate('/user/add');
      }
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
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom: '30px', padding: '20px' }}>
        <Grid container spacing={0}>
          <Grid item sm={12}>
            <Formik
              initialValues={filter}
              onSubmit={handler.search}
            >
              {({ values, setFieldValue, isSubmitting, handleChange, handleSubmit }) => (
                <Form>
                  <Box sx={{ display: 'flex' }}>
                    <FormControl fullWidth>
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
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <FormLabel component="legend">문자 검색</FormLabel>
                    <Select
                      value={values.keywordType}
                      onChange={handleChange}
                      name="keywordType"
                    >
                      <MenuItem value="by_username">아이디</MenuItem>
                      <MenuItem value="by_name">이름</MenuItem>
                      <MenuItem value="by_email">이메일</MenuItem>
                    </Select>
                    <TextField
                      type="text"
                      name="keyword"
                      value={values.keyword}
                      onChange={handleChange}
                      placeholder="검색어를 입력하세요"
                    />
                  </Box>
                  <Box>
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
                  </Box>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 740 }}>
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={page.content.length}
          rowsPerPage={filter.size}
          page={filter.page}
          onPageChange={handler.page}
          onRowsPerPageChange={handler.size}
        />
      </Paper>
      <Paper>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            color="primary"
            variant="contained"
            onClick={handler.move.add}
          >
            등록
          </Button>
        </Box>
      </Paper>
    </>
  );
}

export default UserPage;
