import React from 'react';
import {
  EstimateTemplateShort,
  testTypeName
} from 'estimate_template/domain';
import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';

export interface ListProps {
  list: EstimateTemplateShort[] | undefined;
}

export default function ({ list }: ListProps) {

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Th>No.</Th>
            <Th>실험 타입</Th>
            <Th>용역 항목</Th>
            <Th>세부 항목 수</Th>
          </TableRow>
        </TableHead>
        <TableBody>
          {(!list || list.length === 0) && (
            <TableRow>
              <Td colSpan={4} children="결과가 없습니다." />
            </TableRow>
          )}
          {list && list.map((item,
                             i
          ) => (
            <TableRow hover role="checkbox" key={item.id}>
              <Td>{i + 1}</Td>
              <Td>{testTypeName(item.testType)}</Td>
              <Td>
                <Link to={`/admin/estimate/template-management/${item.id}`}>
                  {item.title}
                </Link>
              </Td>
              <Td>{item.detailCount}</Td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}