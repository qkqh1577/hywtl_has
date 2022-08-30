import React from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import TableCell, { TableCellProps } from 'components/TableCell';
import { DocumentShort } from 'project/document/domain';
import dayjs from 'dayjs';

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

export interface ListProps {
  receivedList?: DocumentShort[];
  sentList?: DocumentShort[];
  buildingList?: DocumentShort[];
}

export default function ({ receivedList, sentList, buildingList }: ListProps) {
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
          {Array.isArray(receivedList) && receivedList.map((item,
                                                            i
          ) => (
            <TableRow key={i}>
              <TableCell>
                {i + 1}
              </TableCell>
              <TableCell>
                {item.code}
              </TableCell>
              <TableCell>
                {"파일"}
              </TableCell>
              <TableCell>
                {item.recipient}
              </TableCell>
              <TableCell>
                {item.mailFile}
              </TableCell>
              <TableCell>
                {item.note}
              </TableCell>
              <TableCell>
                {dayjs(item.createdAt)
                .format('YYYY-MM-DD')}
              </TableCell>
              <TableCell>
                {item.createdBy.name}
              </TableCell>
            </TableRow>
          ))}
          {Array.isArray(sentList) && sentList.map((item,
                                                    i
          ) => (
            <TableRow key={i}>
              <TableCell>
                {i + 1}
              </TableCell>
              <TableCell>
                {item.code}
              </TableCell>
              <TableCell>
                {"파일"}
              </TableCell>
              <TableCell>
                {item.recipient}
              </TableCell>
              <TableCell>
                {item.mailFile}
              </TableCell>
              <TableCell>
                {item.note}
              </TableCell>
              <TableCell>
                {dayjs(item.createdAt)
                .format('YYYY-MM-DD')}
              </TableCell>
              <TableCell>
                {item.createdBy.name}
              </TableCell>
            </TableRow>
          ))}
          {Array.isArray(buildingList) && buildingList.map((item,
                                                            i
          ) => (
            <TableRow key={i}>
              <TableCell>
                {i + 1}
              </TableCell>
              <TableCell>
                {item.code}
              </TableCell>
              <TableCell>
                {"파일"}
              </TableCell>
              <TableCell>
                {item.recipient}
              </TableCell>
              <TableCell>
                {item.mailFile}
              </TableCell>
              <TableCell>
                {item.note}
              </TableCell>
              <TableCell>
                {dayjs(item.createdAt)
                .format('YYYY-MM-DD')}
              </TableCell>
              <TableCell>
                {item.createdBy.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
