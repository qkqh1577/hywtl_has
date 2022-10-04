import React from 'react';
import { EstimateTemplateShort } from 'admin/estimate/template/domain';
import { testTypeName } from 'type/TestType';
import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import TableLayout from 'layouts/TableLayout';
import { DefaultFunction } from 'type/Function';
import TextLink from 'components/TextLink';
import Button from 'layouts/Button';

function OrderModalButton({
                            onSeqModalOpen: onClick
                          }: {
  onSeqModalOpen: DefaultFunction;
}) {

  return (
    <Button
      children="순서 설정"
      onClick={onClick}
      sx={{
        marginRight: '10px',
      }}
    />
  );
}

function AddButton() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/admin/estimate-template-management/add');
  };
  return (
    <Button
      onClick={onClick}
      children="등록"
    />
  );
}

interface Props {
  list: EstimateTemplateShort[] | undefined;
  openSeqModal: DefaultFunction;
}

export default function ({ list, openSeqModal }: Props) {

  return (
    <TableLayout
      disablePagination
      pagination={{
        totalPages:       1,
        totalElements:    list?.length ?? 0,
        number:           0,
        size:             -1,
        empty:            !list || list.length === 0,
        first:            true,
        last:             true,
        numberOfElements: 0,
      }}
      titleRightComponent={
        <>
          <OrderModalButton onSeqModalOpen={openSeqModal} />
          <AddButton />
        </>
      }>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <Th>No.</Th>
              <Th>실험 타입</Th>
              <Th>용역 항목</Th>
              <Th>세부 항목 수</Th>
            </TableRow>
          </TableHead>
          <TableBody>
            {(!list || list.length === 0) && (
              <TableRow>
                <Td colSpan={4} children="결과가 없습니다." />
              </TableRow>
            )}
            {list && list.map((item,
                               i
            ) => (
              <TableRow hover role="checkbox" key={item.id}>
                <Td>{i + 1}</Td>
                <Td>{testTypeName(item.testType)}</Td>
                <Td>
                  <TextLink onClick={`/admin/estimate-template-management/${item.id}`}>
                    {item.title}
                  </TextLink>
                </Td>
                <Td>{item.detailCount}</Td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableLayout>
  );
}