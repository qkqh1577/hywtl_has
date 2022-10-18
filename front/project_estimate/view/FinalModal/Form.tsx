import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import {
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
}

export default function ProjectEstimateFinalModalForm(props: Props) {
  const formik = useContext(FormikContext);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <Th>선택</Th>
          <Th>견적 번호</Th>
          <Th>견적 구분</Th>
          <Th>견적 업체</Th>
          <Th>등록 일시</Th>
          <Th>등록자</Th>
          <Th>송부 여부</Th>
        </TableRow>
      </TableHead>
      <TableBody>
        {(!props.list || props.list.length === 0) && (
          <TableRow>
            <Td colSpan={7}>
              선택할 수 있는 견적서가 없습니다.
            </Td>
          </TableRow>
        )}
        {props.list && props.list.map(item => (
          <TableRow key={item.id}>
            <Td>
              <Radio
                value={item.id}
                checked={item.id === formik.values.id}
                onChange={() => {
                  formik.setFieldValue('id', item.id);
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