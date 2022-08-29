import React from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import TableCell, { TableCellProps } from 'components/TableCell';

const columnProps: TableCellProps[] = [{
  key:      'no',
  children: 'No.',
}, {
  key:      'code',
  children: '자료ID',
}, {
  key:      'file',
  children: '파일'
}, {
  key:      'recipient',
  children: '수신처',
}, {
  key:      'mailFile',
  children: '메일자료'
}, {
  key:      'note',
  children: '비고'
}, {
  key:      'childrenCount',
  children: '등록일시'
}, {
  key:      'createdBy',
  children: '등록자'
}];


export default function () {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columnProps.map((props) => (
              <TableCell {...props} key={props.key} />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>

        </TableBody>
      </Table>
    </TableContainer>
  );
};
