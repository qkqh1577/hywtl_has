import React, { useContext } from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import {
  EstimateContentVariableVO,
} from 'admin/estimate/content/domain';

export interface VariableListProps {
  variableList: EstimateContentVariableVO[] | undefined;
}

export default function VariableList({ variableList }: VariableListProps) {
  console.log(variableList);
  return (
    <Grid container item sm={4}>
      <Grid item sm={12}>
        <Typography>
          *내용으로 변수명을 입력 시, 해당 변수에 해당하는 데이터가 보여집니다.
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  변수명
                </TableCell>
                <TableCell>
                  설명
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {variableList && variableList.map((item,
                                                         i
              ) => {
                return (
                  <TableRow key={i}>
                    <TableCell>
                      {item.name}
                    </TableCell>
                    <TableCell>
                      {item.note}
                    </TableCell>
                  </TableRow>
                );
              })}
              {!variableList && (
                <TableRow>
                  <TableCell colSpan={2}>
                    데이터가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
