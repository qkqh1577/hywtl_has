import React from 'react';
import {
  Box,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import { ContractConditionVariableVO } from 'admin/contract/condition/domain';
import TextBox from 'layouts/Text';

interface Props {
  variableList: ContractConditionVariableVO[] | undefined;
}

export default function VariableList({ variableList }: Props) {
  return (
    <Box sx={{
      width:        '30%',
      display:      'flex',
      flexWrap:     'wrap',
      alignContent: 'flex-start',
    }}>
      <Box sx={{
        width:        '100%',
        marginBottom: '15px',
      }}>
        <TextBox variant="body11">
          * 내용으로 변수명을 입력 시, 해당 변수에 해당하는 데이터가 보여집니다.
        </TextBox>
      </Box>
      <Box sx={{
        width: '100%',
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <Th>변수명</Th>
              <Th>설명</Th>
            </TableRow>
          </TableHead>
          <TableBody>
            {variableList && variableList.map((item) => {
              return (
                <TableRow key={item.name}>
                  <Td>
                    {item.name}
                  </Td>
                  <Td>
                    {item.note}
                  </Td>
                </TableRow>
              );
            })}
            {(!variableList || variableList.length === 0) && (
              <TableRow>
                <Td colSpan={2}>
                  데이터가 없습니다.
                </Td>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
