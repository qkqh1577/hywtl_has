import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import {Link} from "react-router-dom";
import {Button, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";

//https://mui.com/components/tables/
const columns = [
  {id: 'no', label: 'No.', minWidth: 50},
  {id: 'userId', label: '아이디', minWidth: 100},
  {id: 'name', label: '이름', minWidth: 100},
  {id: 'email', label: '이메일', minWidth: 100},
  {id: 'role', label: '권한', minWidth: 100},
  {id: 'department', label: '소속', minWidth: 100},
  {id: 'mobile', label: '핸드폰', minWidth: 100},

];

function createData(no: number, userId: string, name: string, email: string, role: string, department: string, mobile: string) {
  return {no, userId, name, email, role, department, mobile};
}

const rows = [
  createData(1, 'user01', '테스터1', 'tester@hywtl.com', '일반', '테스트팀', '010-0000-0000'),
  createData(2, 'user02', '테스터2', 'tester@hywtl.com', '일반', '테스트팀', '010-0000-0000'),
  createData(3, 'user03', '테스터3', 'tester@hywtl.com', '일반', '테스트팀', '010-0000-0000'),
  createData(4, 'user04', '테스터4', 'tester@hywtl.com', '일반', '테스트팀', '010-0000-0000'),
  createData(5, 'user05', '테스터5', 'tester@hywtl.com', '일반', '테스트팀', '010-0000-0000'),
  createData(6, 'user06', '테스터6', 'tester@hywtl.com', '일반', '테스트팀', '010-0000-0000'),
  createData(7, 'user07', '테스터7', 'tester@hywtl.com', '일반', '테스트팀', '010-0000-0000'),
  createData(8, 'user08', '테스터8', 'tester@hywtl.com', '일반', '테스트팀', '010-0000-0000'),
  createData(9, 'user09', '테스터9', 'tester@hywtl.com', '일반', '테스트팀', '010-0000-0000'),
  createData(10, 'user10', '테스터10', 'tester@hywtl.com', '일반', '테스트팀', '010-0000-0000'),
];

export function UserPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{width: '100%', overflow: 'hidden', 'margin-bottom': '30px', padding: '20px'}}>

        <Grid container spacing={0}>
          <Grid item sm={12}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="검색대상"
              value={10}
            >
              <MenuItem value={10}>아이디</MenuItem>
              <MenuItem value={20}>이름</MenuItem>
              <MenuItem value={30}>이메일</MenuItem>
            </Select>
            <TextField
              type="text"
              name="name"
              label="검색어"
              placeholder="검색어를 입력하세요"
            />
            <Button
              color="primary"
              variant="contained"
              onClick={() => {

              }}
            >
              검색
            </Button>
          </Grid>

        </Grid>

      </Paper>

      <Paper sx={{width: '100%', overflow: 'hidden'}}>
        <TableContainer sx={{maxHeight: 740}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{minWidth: column.minWidth}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'userId'
                              ? <Link to='/user/detail'>{value}</Link>
                              :
                              column.format && typeof value === 'number'
                                ? column.format(value)
                                : value
                            }

                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default UserPage;