import React from 'react';
import {
  EstimateContentShort,
  testTypeName,
} from 'admin/estimate/content/domain';
import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';

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
            <Th>No.</Th>
            <Th>이름</Th>
            <Th>실험 타입</Th>
            <Th>등록된 내용</Th>
          </TableRow>
        </TableHead>
        <TableBody>
          {(!list || list.length === 0) && (
            <TableRow>
              <Td colSpan={4}>
                검색된 결과가 없습니다.
              </Td>
            </TableRow>
          )}
          {Array.isArray(list) && list.map((item,
                                            i
          ) => (
            <TableRow
              hover
              role="checkbox"
              key={item.id}>
              <Td>{i + 1}</Td>
              <Td>
                <Link to={`/admin/estimate/content-management/${item.id}`}>
                  {item.name}
                </Link>
              </Td>
              <Td>
                {
                  item.testTypeList
                      .map(testTypeName)
                      .join(', ')
                }
              </Td>
              <Td>{item.detailCount}</Td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
