import {
  projectProgressStatusName,
  ProjectShortVO
} from 'project/domain';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import TableCell, { TableCellProps } from 'components/TableCell';
import React, { useMemo } from 'react';
import { ColorPalette } from 'app/view/App/theme';

export interface ListProps {
  list: ProjectShortVO[];
  openMenu: boolean;
  onRowClick: (item: ProjectShortVO) => void;
}

export default function ({ list, openMenu: open, onRowClick }: ListProps) {

  const columnProps: TableCellProps[] = useMemo(() => [{
    key:      'code',
    children: open ? '프로젝트번호' : '번호',
  }, {
    key:      'name',
    children: open ? '프로젝트 이름' : '이름',
  }, {
    key:      'progressStatus',
    children: '진행현황',
  }], [open]);
  return (
    <TableContainer>
      <Table
        stickyHeader
        aria-label="sticky table"
        sx={{
          backgroundColor:   ColorPalette.White,
          borderLeft:        `1px solid ${ColorPalette.Blue['7']}`,
          borderTop:         `1px solid ${ColorPalette.Blue['7']}`,
          borderRadius:      '5px',
          '& th, & td':      {
            textAlign:       'center',
            fontSize:        '12px',
            height:          '36px',
            padding:         '0 10px',
            backgroundColor: 'transparent',
            color:           ColorPalette.DarkGray,
          },
          '& th':            {
            fontWeight:   'bold',
            borderBottom: `5px solid ${ColorPalette.Blue['7']}`,
          },
          '& th:last-child': {
            borderRight: `1px solid ${ColorPalette.Blue['7']}`,
          },
          '& td':            {
            borderRight:  `1px solid ${ColorPalette.Blue['7']}`,
            borderBottom: `1px solid ${ColorPalette.Blue['7']}`,
          },
        }}>
        <TableHead>
          <TableRow>
            {columnProps.map((props) => (
              <TableCell {...props} key={props.key} />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(!list || list.length === 0) && (
            <TableRow>
              <TableCell colSpan={columnProps.length} children="결과가 없습니다." />
            </TableRow>
          )}
          {list && list.map((item) => (
            <TableRow
              hover
              key={item.id}
              role="button"
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                onRowClick(item);
              }}
            >
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{projectProgressStatusName(item.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}