import React from 'react';
import { ProjectContractCollectionVO } from 'project_contract/domain';
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
import { cut10000 } from 'util/NumberUtil';
import DateFormat from 'layouts/DateFormat';

interface Props {
  collection?: ProjectContractCollectionVO;
}

export default function CollectionTable(props: Props) {
  const stageList = props.collection?.stageList;
  const totalAmount = props.collection?.totalAmount;
  console.log(stageList)
  console.log(totalAmount);
  return (
    <Box sx={{
      display:      'flex',
      flexWrap:     'wrap',
      width:        '100%',
      alignContent: 'flex-start',
      flex:         1,
    }}>
      <Box sx={{
        display:  'flex',
        flexWrap: 'nowrap',
        width:    '100%',
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <Th>기성명</Th>
              <Th>비율(%)</Th>
              <Th>금액(만 원)</Th>
              <Th>예정일</Th>
            </TableRow>
          </TableHead>
          <TableBody>
            {stageList?.map((item,
                                            i
            ) => (
              <TableRow key={item.name}>
                <Td>
                  {item.name}
                </Td>
                <Td>{totalAmount ? (item.amount / totalAmount * 100).toFixed(1) : 0}</Td>
                <Td>{cut10000(item.amount)
                .toLocaleString()}</Td>
                <Td>
                  <DateFormat date={item.expectedDate} />
                </Td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
