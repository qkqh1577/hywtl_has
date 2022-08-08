import {
  Table,
  TableBody,
  TableCell,
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
import Page from 'services/common/domain/Page';

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

export interface ListProps {
  page: Page<UserVO>;
}

export default function ({
                           page,
                         }: ListProps) {
  return (
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
          {page.content.map((user,
                             i
          ) => {
            const no = i + 1 + page.size * page.number;
            return (
              <TableRow hover role="checkbox" key={user.id}>
                <TableCell>{no}</TableCell>
                <TableCell>
                  <Link to={`/user/${user.id}`}>
                    {user.username}
                  </Link>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{userRoleName(user.role)}</TableCell>
                <TableCell>{user.department.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}