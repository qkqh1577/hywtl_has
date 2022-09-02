import React from 'react';
import {
  EstimateTemplateShort,
  testTypeName
} from 'estimate_template/domain';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Table } from 'layouts/Table';

export interface ListProps {
  list: EstimateTemplateShort[] | undefined;
}

export default function ({ list }: ListProps) {

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>실험 타입</TableCell>
            <TableCell>용역 항목</TableCell>
            <TableCell>세부 항목 수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(!list || list.length === 0) && (
            <TableRow>
              <TableCell colSpan={4} children="결과가 없습니다." />
            </TableRow>
          )}
          {list && list.map((item,
                             i
          ) => (
            <TableRow hover role="checkbox" key={item.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{testTypeName(item.testType)}</TableCell>
              <TableCell>
                <Link to={`/admin/estimate/template-management/${item.id}`}>
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