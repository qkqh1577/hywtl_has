import React from 'react';
import Page from 'type/Page';
import { BusinessShort } from 'business/domain';
import { TableCellProps } from 'components/TableCell';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Link,
  useNavigate
} from 'react-router-dom';

export interface ListProps {
  page: Page<BusinessShort> | undefined;
}

const columnProps: TableCellProps[] = [
  {
    key:      'no',
    children: 'No'
  },
  {
    key:      'name',
    children: '업체명'
  },
  {
    key:      'ceoName',
    children: '대표명'
  },
  {
    key:      'registrationNumber',
    children: '사업자번호'
  },
  {
    key:      'address',
    children: '주소'
  },
  {
    key:      'officePhone',
    children: '대표전화번호'
  },
  {
    key:      'managerCount',
    children: '담당자'
  },
  {
    key:      'projectCount',
    children: '참여프로젝트 총 개수'
  },
  {
    key:      'note',
    children: '비고'
  }

];

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
              <TableCell colSpan={columnProps.length} children="결과가 없습니다."></TableCell>
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
                  <Link to={`/business/${item.id}`}>
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell>
                  {item.ceoName}
                </TableCell>
                <TableCell>
                  {item.registrationNumber}
                </TableCell>
                <TableCell>
                  {item.address}
                </TableCell>
                <TableCell>
                  {item.officePhone}
                </TableCell>
                <TableCell>
                  {item.managerCount}
                </TableCell>
                <TableCell>
                  {item.projectCount}
                </TableCell>
                <TableCell>
                  {item.note}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
