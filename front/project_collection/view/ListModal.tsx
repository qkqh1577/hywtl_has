import React from 'react';
import ModalLayout from 'layouts/ModalLayout';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import {
  Box,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import {
  projectCollectionStageStatusTypeName,
  ProjectCollectionStageStatusVO
} from 'project_collection/domain';
import { DefaultFunction } from 'type/Function';
import DateFormat from 'layouts/DateFormat';

interface Props {
  open: boolean;
  onClose: DefaultFunction;
  list?: ProjectCollectionStageStatusVO[];
}

function ListModal(props : Props) {
  return (
    <ModalLayout
      title="수금 현황 이력"
      width="50vw"
      open={props.open}
      onClose={props.onClose}
      children={
        <Box sx={{
          width:    '100%',
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <Th>예정일</Th>
                <Th>유형</Th>
                <Th>일자</Th>
                <Th>변경 예정일</Th>
                <Th>금액</Th>
                <Th>비고</Th>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(props.list) &&
                props.list.length > 0 ? (props.list.map((item, index) => {
                return (
                  <TableRow key={`${item.type}_${index}`}>
                    <Td>
                      <DateFormat date={item.expectedDate} />
                    </Td>
                    <Td>{projectCollectionStageStatusTypeName(item.type)}</Td>
                    <Td>
                      <DateFormat date={item.requestedDate} />
                    </Td>
                    <Td>
                      <DateFormat date={item.delayedDate} />
                    </Td>
                    <Td>{item.amount && item.amount.toLocaleString()}</Td>
                    <Td>{item.note}</Td>
                  </TableRow>
                )})) : (
                  <TableRow>
                    <Td colSpan={6}>{'수금 현황 이력 데이터가 없습니다.'}</Td>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </Box>
      }
    />
  );
}

export default ListModal;
