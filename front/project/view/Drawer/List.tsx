import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React from 'react';
import { ColorPalette } from 'assets/theme';
import {
  ProjectId,
  projectProgressStatusName,
  ProjectShortVO
} from 'project/domain';

export interface ListProps {
  list: ProjectShortVO[];
  openMenu: boolean;
  onRowClick: (item: ProjectShortVO) => void;
  searchFormRef: React.RefObject<HTMLDivElement>;
  id: ProjectId;
}

export default function ({ list, openMenu: open, onRowClick, searchFormRef, id: projectId }: ListProps) {

  const searchFormHeight = searchFormRef.current?.offsetHeight ?? 180;

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
          maxWidth:             '280px',
          backgroundColor:      ColorPalette._ffffff,
          borderRadius:         '5px',
          '& th, & td':         {
            textAlign:       'center',
            fontSize:        '12px',
            height:          '36px',
            backgroundColor: 'transparent',
            borderLeft:      `1px solid ${ColorPalette._e4e9f2}`,
            borderTop:       `1px solid ${ColorPalette._e4e9f2}`,
            borderBottom:    'none',
            color:           ColorPalette._252627,
          },
          '& td':               {
            padding: '0 10px',
          },
          '& th':               {
            fontWeight:      'bold',
            borderBottom:    `5px solid ${ColorPalette._e4e9f2}`,
            backgroundColor: ColorPalette._ffffff,
            padding:         0,
          },
          '& th:first-of-type': {
            borderTopLeftRadius: '5px',
          },
          '& th:last-child':    {
            borderRight:          `1px solid ${ColorPalette._e4e9f2}`,
            borderTopRightRadius: '5px',
          },
          '& td:last-child':                             {
            borderRight: `1px solid ${ColorPalette._e4e9f2}`,
          },
          '& tbody > tr:first-of-type > td ':            {
            borderBottom: `1px solid ${ColorPalette._e4e9f2}`,
          },
          '& tbody > tr:last-child > td:first-of-type ': {
            borderBottom:           `1px solid ${ColorPalette._e4e9f2}`,
            borderBottomLeftRadius: '5px',
          },
          '& tbody > tr:last-child > td:last-child ':    {
            borderBottom:            `1px solid ${ColorPalette._e4e9f2}`,
            borderBottomRightRadius: '5px',
          },
        }}>

        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '48px', }}>{open ? '프로젝트번호' : '번호'}</TableCell>
            <TableCell>{open ? '프로젝트 이름' : '이름'}</TableCell>
            <TableCell sx={{ width: '58px', }}>진행현황</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(!list || list.length === 0) && (
            <TableRow>
              <TableCell colSpan={3} children="결과가 없습니다." />
            </TableRow>
          )}
          {list && list.filter((item) => item.isFavorite).map((item) => (
            <TableRow
              hover
              key={item.id}
              role="button"
              sx={{
                cursor: 'pointer',
                backgroundColor: ColorPalette._d2e7fa,
              }}
              onClick={() => {
                onRowClick(item);
              }}
            >
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{projectProgressStatusName(item.progressStatus)}</TableCell>
            </TableRow>
          ))}
          {list && list.map((item) => (
            <TableRow
              hover
              selected={item.id === projectId}
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
