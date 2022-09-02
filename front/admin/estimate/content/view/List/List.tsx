import React from 'react';
import {
  EstimateContentShort,
  testTypeName,
} from 'admin/estimate/content/domain';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Table } from 'layouts/Table';

export interface ListProps {
  list: EstimateContentShort[] | undefined;
}

export default function ({ list }: ListProps) {
  return (
    <TableContainer>
      <Table
        stickyHeader
        aria-label={'sticky table'}>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>실험 타입</TableCell>
            <TableCell>등록된 내용</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(!list || list.length === 0) && (
            <TableRow>
              <TableCell colSpan={4}>
                검색된 결과가 없습니다.
              </TableCell>
            </TableRow>
          )}
          {Array.isArray(list) && list.map((item,
                                            i
          ) => (
            <TableRow
              hover
              role="checkbox"
              key={item.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                <Link to={`/admin/estimate/content-management/${item.id}`}>
                  {item.name}
                </Link>
              </TableCell>
              <TableCell>{item.testTypeList.map(testTypeName)
                              .join(', ')}</TableCell>
              <TableCell>{item.detailCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
