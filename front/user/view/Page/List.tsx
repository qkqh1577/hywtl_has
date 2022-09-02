import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  userRoleName,
  UserVO,
} from 'user/domain';
import React from 'react';
import Page from 'type/Page';
import { Table } from 'layouts/Table';

interface Props {
  page: Page<UserVO> | undefined;
}

export default function ({ page }: Props) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>아이디</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>이메일</TableCell>
            <TableCell>권한</TableCell>
            <TableCell>소속</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(!page || page.content.length === 0) && (
            <TableRow>
              <TableCell colSpan={6} children="결과가 없습니다." />
            </TableRow>
          )}
          {page && page.content.map((item,
                                     i
          ) => {
            const no = i + 1 + page.size * page.number;
            return (
              <TableRow hover role="checkbox" key={item.id}>
                <TableCell>{no}</TableCell>
                <TableCell>
                  <Link to={`/admin/user-management/${item.id}`}>
                    {item.username}
                  </Link>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{userRoleName(item.role)}</TableCell>
                <TableCell>{item.department.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}