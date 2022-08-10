import React from 'react';
import {
  EstimateTemplateShort,
  testTypeName
} from 'estimate/domain/template';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import TableCell, { TableCellProps } from 'type/TableCell';
import { Link } from 'react-router-dom';

export interface ListProps {
  list: EstimateTemplateShort[] | undefined;
}

const columnProps: TableCellProps[] = [{
  key:      'no',
  children: 'No.',
}, {
  key:      'testType',
  children: '실험 타입',
}, {
  key:      'title',
  children: '용역 항목',
}, {
  key:      'detailCount',
  children: '세부 항목 수'
}];

export default function ({ list }: ListProps) {

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
          {(!list || list.length === 0) && (
            <TableRow>
              <TableCell colSpan={columnProps.length} children="결과가 없습니다." />
            </TableRow>
          )}
          {list && list.map((item,
                             i
          ) => (
            <TableRow hover role="checkbox" key={item.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{testTypeName(item.testType)}</TableCell>
              <TableCell>
                <Link to={`/estimate/template/${item.id}`}>
                  {item.title}
                </Link>
              </TableCell>
              <TableCell>{item.detailCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}