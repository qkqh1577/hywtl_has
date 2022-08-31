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
  searchFormRef: React.RefObject<HTMLDivElement>;
}

export default function ({ list, openMenu: open, onRowClick, searchFormRef }: ListProps) {

  const searchFormHeight = searchFormRef.current?.offsetHeight ?? 180;

  const columnProps: TableCellProps[] = useMemo(() => [{
    key:      'code',
    children: open ? '프로젝트번호' : '번호',
    sx:       {
      width: '48px',
    }
  }, {
    key:      'name',
    children: open ? '프로젝트 이름' : '이름',
  }, {
    key:      'progressStatus',
    children: '진행현황',
    sx:       {
      width: '58px',
    }
  }], [open]);
  return (
    <TableContainer sx={{
      width:                        '100%',
      overflowX:                    'hidden',
      overflowY:                    'scroll',
      height:                       `calc(100% - ${searchFormHeight}px)`,
      padding:                      '0 10px',
      '&::-webkit-scrollbar':       {
        width:           '10px',
        height:          '10px',
        backgroundColor: ColorPalette._e4e9f2,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: ColorPalette._697183,
      }
    }}>
      <Table
        stickyHeader
        aria-label="sticky table"
        sx={{
          maxWidth:                                      '280px',
          backgroundColor:                               ColorPalette.White,
          borderRadius:                                  '5px',
          '& th, & td':                                  {
            textAlign:       'center',
            fontSize:        '12px',
            height:          '36px',
            backgroundColor: 'transparent',
            borderLeft:      `1px solid ${ColorPalette.Blue['7']}`,
            borderTop:       `1px solid ${ColorPalette.Blue['7']}`,
            borderBottom:    'none',
            color:           ColorPalette.DarkGray,
          },
          '& td':                                        {
            padding: '0 10px',
          },
          '& th':                                        {
            fontWeight:      'bold',
            borderBottom:    `5px solid ${ColorPalette.Blue['7']}`,
            backgroundColor: ColorPalette._fff,
            padding:         0,
          },
          '& th:first-of-type':                          {
            borderTopLeftRadius: '5px',
          },
          '& th:last-child':                             {
            borderRight:          `1px solid ${ColorPalette.Blue['7']}`,
            borderTopRightRadius: '5px',
          },
          '& td:last-child':                             {
            borderRight: `1px solid ${ColorPalette.Blue['7']}`,
          },
          '& tbody > tr:first-of-type > td ':            {
            borderBottom: `1px solid ${ColorPalette.Blue['7']}`,
          },
          '& tbody > tr:last-child > td:first-of-type ': {
            borderBottom:           `1px solid ${ColorPalette.Blue['7']}`,
            borderBottomLeftRadius: '5px',
          },
          '& tbody > tr:last-child > td:last-child ':    {
            borderBottom:            `1px solid ${ColorPalette.Blue['7']}`,
            borderBottomRightRadius: '5px',
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
              <TableCell>{projectProgressStatusName(item.progressStatus)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}