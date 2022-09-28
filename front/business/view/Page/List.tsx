import React from 'react';
import Page from 'type/Page';
import { BusinessShort } from 'business/domain';
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
import TextLink from 'components/TextLink';
import TableLayout from 'layouts/TableLayout';

export interface ListProps {
  page: Page<BusinessShort> | undefined;
}

export default function ({ page }: ListProps) {

  return (
    <TableLayout
      pagination={page ? { ...page } : undefined}
      sizeFieldName="size"
      table={
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
      }
    />
  );
}
