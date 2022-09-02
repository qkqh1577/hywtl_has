import Page from 'type/Page';
import {
  departmentCategoryName,
  DepartmentShort
} from 'department/domain';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'layouts/Table';

export interface ListProps {
  page: Page<DepartmentShort> | undefined;
}

export default function ({ page }: ListProps) {

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>조직명</TableCell>
            <TableCell>유형</TableCell>
            <TableCell>상위 조직</TableCell>
            <TableCell>소속 유저 수</TableCell>
            <TableCell>하위 조직 수</TableCell>
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
                  <Link to={`/admin/department-management/${item.id}`}>
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell>
                  {departmentCategoryName(item.category)}
                </TableCell>
                <TableCell>
                  {item.parent ? item.parent.name : '-'}
                </TableCell>
                <TableCell>
                  {item.userCount || 0}
                </TableCell>
                <TableCell>
                  {item.childrenCount || 0}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );

}