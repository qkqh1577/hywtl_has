import React from 'react';
import {
  EstimateContentShort,
  testTypeName,
} from 'admin/estimate/content/domain';
import {
  Box,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import IconButton from 'components/IconButton';
import {
  ArrowDownward as DownIcon,
  ArrowUpward as UpIcon,
} from '@mui/icons-material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';

export interface SeqModalListProps {
  list: EstimateContentShort[];
  setList: (list: EstimateContentShort[]) => void;
}

export default function EstimateContentSeqModalList({
                                                      list,
                                                      setList
                                                    }: SeqModalListProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Th>No.</Th>
            <Th>이름</Th>
            <Th>실험 타입</Th>
            <Th>등록된 내용</Th>
            <Th>순서</Th>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item,
                     i
          ) => (
            <TableRow key={item.id}>
              <Td>{i + 1}</Td>
              <Td>{item.name}</Td>
              <Td>{item.testTypeList.map(testTypeName)
                       .join(', ')}</Td>
              <Td>{item.detailCount}</Td>
              <Td>
                <Box sx={{
                  display:        'flex',
                  width:          '100%',
                  justifyContent: 'space-around',
                }}>
                  <IconButton
                    disabled={i === 0}
                    children={<UpIcon />}
                    onClick={() => {
                      const result: EstimateContentShort[] = [];
                      for (let j = 0; j < list.length; j++) {
                        if (i === j) {
                          continue;
                        }
                        if (i - 1 === j) {
                          result.push(item);
                        }
                        result.push(list[j]);
                      }
                      setList(result);
                    }}
                  />
                  <IconButton
                    disabled={i === list.length - 1}
                    onClick={() => {
                      const result: EstimateContentShort[] = [];
                      for (let j = 0; j < list.length; j++) {
                        if (i === j) {
                          continue;
                        }
                        result.push(list[j]);
                        if (i + 1 === j) {
                          result.push(item);
                        }
                      }
                      setList(result);
                    }}
                    children={<DownIcon />}
                  />
                </Box>
              </Td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
