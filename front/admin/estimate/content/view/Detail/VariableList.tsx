import React from 'react';
import {
  Grid,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { EstimateContentVariableVO, } from 'admin/estimate/content/domain';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';

export interface VariableListProps {
  variableList: EstimateContentVariableVO[] | undefined;
}

export default function VariableList({ variableList }: VariableListProps) {
  return (
    <Grid container item sm={4}>
      <Grid item sm={12}>
        *내용으로 변수명을 입력 시, 해당 변수에 해당하는 데이터가 보여집니다.
        <TableContainer>
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
        </TableContainer>
      </Grid>
    </Grid>
  );
};
