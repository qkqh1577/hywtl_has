import React from 'react';
import {
  EstimateContentShort,
  testTypeName
} from 'admin/estimate/content/domain';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import IconButton from 'components/IconButton';
import {
  ArrowUpward as UpIcon,
  ArrowDownward as DownIcon,
} from '@mui/icons-material';

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
            <TableCell>No.</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>실험 타입</TableCell>
            <TableCell>등록된 내용</TableCell>
            <TableCell>순서</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item,
                     i
          ) => (
            <TableRow key={item.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{testTypeName(item.testType)}</TableCell>
              <TableCell>{item.detailCount}</TableCell>
              <TableCell>
                <Box sx={{
                  display: 'flex',
                  width: '100%',
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
