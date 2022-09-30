import React from 'react';
import {
  TableBody,
  TableHead,
  TableRow,
} from '@mui/material';
import { EstimateContentVariableVO, } from 'admin/estimate/content/domain';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';

export interface Props {
  variableList: EstimateContentVariableVO[] | undefined;
}

export default function VariableList({ variableList }: Props) {
  return (

    <Table>
      <TableHead>
        <TableRow>
          <Th>
            변수명
          </Th>
          <Th>
            설명
          </Th>
        </TableRow>
      </TableHead>
      <TableBody>
        {variableList && variableList.map((item,
                                           i
        ) => {
          return (
            <TableRow key={i}>
              <Td>
                {item.name}
              </Td>
              <Td>
                {item.note}
              </Td>
            </TableRow>
          );
        })}
        {!variableList && (
          <TableRow>
            <Td colSpan={2}>
              데이터가 없습니다.
            </Td>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
