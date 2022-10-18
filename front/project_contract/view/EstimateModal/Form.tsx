import React from 'react';
import {
  ProjectEstimateId,
  projectEstimateTypeName,
  ProjectEstimateVO
} from 'project_estimate/domain';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import {
  Radio,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import DateFormat from 'layouts/DateFormat';

interface Props {
  list: ProjectEstimateVO[] | undefined;
  estimateId: ProjectEstimateId | undefined;
  setEstimateId: (estimateId: ProjectEstimateId) => void;
}

export default function ProjectEstimateFinalModalForm(props: Props) {

  return (
    <Table>
      <TableHead>
        <TableRow>
          <Th>선택</Th>
          <Th>견적 번호</Th>
          <Th>견적 구분</Th>
          <Th>견적 업체</Th>
          <Th>최종 여부</Th>
          <Th>등록 일시</Th>
          <Th>등록자</Th>
          <Th>송부 여부</Th>
        </TableRow>
      </TableHead>
      <TableBody>
        {(!props.list || props.list.length === 0) && (
          <TableRow>
            <Td colSpan={8}>
              선택할 수 있는 견적서가 없습니다.
            </Td>
          </TableRow>
        )}
        {props.list && props.list.map(item => (
          <TableRow key={item.id}>
            <Td>
              <Radio
                value={item.id}
                checked={item.id === props.estimateId}
                onChange={() => {
                  props.setEstimateId(item.id);
                }}
              />
            </Td>
            <Td>
              {item.code}
            </Td>
            <Td>
              {projectEstimateTypeName(item.type)}
            </Td>
            <Td>
              {item.business.name}
            </Td>
            <Td>
              {item.confirmed ? 'Y' : 'N'}
            </Td>
            <Td>
              <DateFormat date={item.createdAt} format="YYYY-MM-DD HH:mm" />
            </Td>
            <Td>
              {item.createdBy.name}
            </Td>
            <Td>
              {item.isSent ? 'Y' : 'N'}
            </Td>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

}