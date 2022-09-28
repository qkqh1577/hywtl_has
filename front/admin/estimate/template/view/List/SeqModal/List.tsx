import React from 'react';
import {
  Box,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  ArrowDownward as DownIcon,
  ArrowUpward as UpIcon,
} from '@mui/icons-material';
import {
  EstimateTemplateShort,
  testTypeName
} from 'admin/estimate/template/domain';
import IconButton from 'components/IconButton';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';

export interface SeqModalListProps {
  list: EstimateTemplateShort[];
  setList: (list: EstimateTemplateShort[]) => void;
}

export default function EstimateTemplateSeqModalList({ list, setList }: SeqModalListProps) {

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Th>No.</Th>
            <Th>실험타입</Th>
            <Th>용역 항목</Th>
            <Th>순서</Th>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item,
                     i
          ) => (
            <TableRow key={item.id}>
              <Td>{i + 1}</Td>
              <Td>{testTypeName(item.testType)}</Td>
              <Td>{item.title}</Td>
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
                      const result: EstimateTemplateShort[] = [];
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
                      const result: EstimateTemplateShort[] = [];
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
}