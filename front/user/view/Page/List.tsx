import {
  TableBody,
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
import {
  Table,
  Td,
  Th
} from 'layouts/Table';

interface Props {
  page: Page<UserVO> | undefined;
}

export default function ({ page }: Props) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Th>No.</Th>
            <Th>아이디</Th>
            <Th>이름</Th>
            <Th>이메일</Th>
            <Th>권한</Th>
            <Th>소속</Th>
          </TableRow>
        </TableHead>
        <TableBody>
          {(!page || page.content.length === 0) && (
            <TableRow>
              <Td colSpan={6} children="결과가 없습니다." />
            </TableRow>
          )}
          {page && page.content.map((item,
                                     i
          ) => {
            const no = i + 1 + page.size * page.number;
            return (
              <TableRow hover role="checkbox" key={item.id}>
                <Td>{no}</Td>
                <Td>
                  <Link to={`/admin/user-management/${item.id}`}>
                    {item.username}
                  </Link>
                </Td>
                <Td>{item.name}</Td>
                <Td>{item.email}</Td>
                <Td>{userRoleName(item.role)}</Td>
                <Td>{item.department.name}</Td>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}