import React from 'react';
import Page from 'type/Page';
import { BusinessShortVO } from 'business/domain';
import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import Button from 'layouts/Button';
import TextLink from 'layouts/TextLink';
import TableLayout from 'layouts/TableLayout';
import { useNavigate } from 'react-router-dom';

export interface ListProps {
  page: Page<BusinessShortVO> | undefined;
}

function AddButton() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/business-management/add');
  };
  return (
    <Button
      onClick={onClick}
      children="등록"
    />
  );
}

export default function ({ page }: ListProps) {

  return (
    <TableLayout
      pagination={page ? { ...page } : undefined}
      sizeFieldName="size"
      titleRightComponent={<AddButton />}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <Th>No.</Th>
              <Th>업체명</Th>
              <Th>대표명</Th>
              <Th>사업자번호</Th>
              <Th>주소</Th>
              <Th>대표전화번호</Th>
              <Th>담당자</Th>
              <Th>참여프로젝트 총 개수</Th>
              <Th>비고</Th>
            </TableRow>
          </TableHead>
          <TableBody>
            {(!page || page.content.length === 0) && (
              <TableRow>
                <Td colSpan={9} children="결과가 없습니다." />
              </TableRow>
            )}
            {page && page.content.map((item,
                                       i
            ) => {
              const no = i + 1 + page.size * page.number;
              return (
                <TableRow hover role="checkbox" key={item.id}>
                  <Td>{no}</Td>
                  <Td>
                    <TextLink onClick={`/business-management/${item.id}`}>
                      {item.name}
                    </TextLink>
                  </Td>
                  <Td>
                    {item.ceoName}
                  </Td>
                  <Td>
                    {item.registrationNumber}
                  </Td>
                  <Td>
                    {item.address}
                  </Td>
                  <Td>
                    {item.officePhone}
                  </Td>
                  <Td>
                    {item.managerCount}
                  </Td>
                  <Td>
                    {item.projectCount}
                  </Td>
                  <Td>
                    {item.note}
                  </Td>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </TableLayout>
  );
}
