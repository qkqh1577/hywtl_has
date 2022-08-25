import React from 'react';
import {
  EstimateContentShort,
  testTypeName,
} from 'admin/estimate/content/domain';
import TableCell, { TableCellProps } from 'components/TableCell';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Link } from 'react-router-dom';

export interface ListProps {
  list: EstimateContentShort[] | undefined;
}

const columnProps: TableCellProps[] = [
  {
    key:      'no',
    children: 'No.',
  },
  {
    key:      'name',
    children: '이름'
  },
  {
    key:      'testType',
    children: '실험 타입'
  },
  {
    key:      'detailCount',
    children: '등록된 내용'
  }
];

export default function ({ list }: ListProps) {
  return (
    <TableContainer>
      <Table
        stickyHeader
        aria-label={'sticky table'}>
        <TableHead>
          <TableRow>
            {columnProps.map((props) => (
              <TableCell {...props} />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(!list || list.length === 0) && (
            <TableRow>
              <TableCell
                colSpan={columnProps.length}>
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
              <TableCell>{item.testType.map(testTypeName).join(', ')}</TableCell>
              <TableCell>{item.detailCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
