import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  ArrowUpward as UpIcon,
  ArrowDownward as DownIcon,
} from '@mui/icons-material';
import {
  EstimateTemplateShort,
  testTypeName
} from 'estimate_template/domain';
import IconButton from 'components/IconButton';

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
            <TableCell>No.</TableCell>
            <TableCell>실험타입</TableCell>
            <TableCell>용역 항목</TableCell>
            <TableCell>순서</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item,
                     i
          ) => (
            <TableRow key={item.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{testTypeName(item.testType)}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}