import React from 'react';
import Page from 'type/Page';
import { PersonnelShortVO, } from 'personnel/domain';
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
import DateFormat from 'components/DateFormat';

export interface ListProps {
  page: Page<PersonnelShortVO> | undefined;
}

export default function List(props: ListProps) {
  const { page } = props;
  return (
    <TableLayout
      pagination={page ? { ...page } : undefined}
      sizeFieldName="size"
      pageFieldName="page"
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <Th>No</Th>
              <Th>이름</Th>
              <Th>이메일</Th>
              <Th>성별</Th>
              <Th>생년월일</Th>
              <Th>소속 부서</Th>
              <Th>입사 구분</Th>
              <Th>입사일</Th>
              <Th>상태</Th>
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
                    <TextLink onClick={`/hr-card-management/${item.id}`}>
                      {item.name}
                    </TextLink>
                  </Td>
                  <Td>
                    <TextLink onClick={`/hr-card-management/${item.id}`}>
                      {item.email}
                    </TextLink>
                  </Td>
                  <Td>
                    {item.basic?.sex}
                  </Td>
                  <Td>
                    <DateFormat date={item.basic?.birthDate} />
                  </Td>
                  <Td>
                    {item.department?.name}
                  </Td>
                  <Td>
                    {item.company?.hiredType}
                  </Td>
                  <Td>
                    <DateFormat date={item.company?.hiredDate} />
                  </Td>
                  <Td>
                    {item.userStatus}
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
