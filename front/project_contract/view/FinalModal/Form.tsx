import React, { useContext } from 'react';
import { FormikContext } from 'formik';
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
import { ProjectContractShortVO } from 'project_contract/domain';

interface Props {
  list: ProjectContractShortVO[] | undefined;
}

export default function ProjectContractFinalModalForm(props: Props) {
  const formik = useContext(FormikContext);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <Th>선택</Th>
          <Th>계약 번호</Th>
          <Th>견적 번호</Th>
          <Th>등록 일시</Th>
          <Th>계약 일시</Th>
          <Th>등록자</Th>
          <Th>송부 여부</Th>
        </TableRow>
      </TableHead>
      <TableBody>
        {(!props.list || props.list.length === 0) && (
          <TableRow>
            <Td colSpan={7}>
              선택할 수 있는 계약서가 없습니다.
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
              {item.estimateCode}
            </Td>
            <Td>
              <DateFormat date={item.createdAt} format="YYYY-MM-DD HH:mm" />
            </Td>
            <Td>
              <DateFormat date={item.contractDate} />
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