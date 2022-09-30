import React from 'react';
import {
  Box,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { EstimateTemplateShort } from 'admin/estimate/template/domain';
import { testTypeName } from 'type/TestType';
import IconButton from 'components/IconButton';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DefaultFunction } from 'type/Function';

export interface SeqModalListProps {
  list: EstimateTemplateShort[];
  setList: DefaultFunction<EstimateTemplateShort[]>;
}

export default function EstimateTemplateSeqModalList(props: SeqModalListProps) {

  const {
          list, setList
        } = props;

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
                    tooltip="순서 올리기"
                    shape="square"
                    disabled={i === 0}
                    children={<FontAwesomeIcon icon="angle-up" />}
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
                    tooltip="순서 내리기"
                    shape="square"
                    disabled={i === list.length - 1}
                    children={<FontAwesomeIcon icon="angle-down" />}
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