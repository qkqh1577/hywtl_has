import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  userRoleName,
  UserVO
} from 'user/domain/user';
import React from 'react';
import Page from 'type/Page';
import TableCell, { TableCellProps } from 'type/TableCell';

export interface ListProps {
  page: Page<UserVO> | undefined;
}

const columnProps: TableCellProps[] = [{
  key:      'no',
  children: 'No.',
}, {
  key:      'username',
  children: '아이디',
}, {
  key:      'name',
  children: '이름',
}, {
  key:      'email',
  children: '이메일'
}, {
  key:      'role',
  children: '권한',
}, {
  key:      'department',
  children: '소속'
}];

export default function ({ page }: ListProps) {
  return (
    <TableContainer>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columnProps.map((props) => (
              <TableCell {...props} />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(!page || page.content.length === 0) && (
            <TableRow>
              <TableCell colSpan={columnProps.length} children="결과가 없습니다." />
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
                  <Link to={`/user/${item.id}`}>
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