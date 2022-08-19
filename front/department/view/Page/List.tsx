import Page from 'type/Page';
import {
  departmentCategoryName,
  DepartmentShort
} from 'department/domain';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import TableCell, { TableCellProps } from 'components/TableCell';
import React from 'react';
import { Link } from 'react-router-dom';

export interface ListProps {
  page: Page<DepartmentShort> | undefined;
}

const columnProps: TableCellProps[] = [{
  key:      'no',
  children: 'No.',
}, {
  key:      'name',
  children: '조직명',
}, {
  key:      'category',
  children: '유형'
}, {
  key:      'parent',
  children: '상위 조직',
}, {
  key:      'userCount',
  children: '소속 유저 수'
}, {
  key:      'childrenCount',
  children: '하위 조직 수'
}];

export default function ({ page }: ListProps) {

  return (
    <TableContainer>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columnProps.map((props) => (
              <TableCell {...props} key={props.key} />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(!page || page.content.length === 0) && (
            <TableRow>
              <TableCell colSpan={columnProps.length} children="결과가 없습니다." />
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
                  <Link to={`/department-management/${item.id}`}>
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