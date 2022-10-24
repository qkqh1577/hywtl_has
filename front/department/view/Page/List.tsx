import Page from 'type/Page';
import {
  departmentCategoryName,
  DepartmentShortVO
} from 'department/domain';
import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React from 'react';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import Button from 'layouts/Button';
import TextLink from 'layouts/TextLink';
import TableLayout from 'layouts/TableLayout';
import { useNavigate } from 'react-router-dom';

function AddButton() {

  const navigate = useNavigate();
  const onClick = () => {
    navigate('/admin/department-management/add');
  };
  return (
    <Button
      onClick={onClick}
      children="등록"
    />
  );
}

export interface ListProps {
  page: Page<DepartmentShortVO> | undefined;
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
              <Th>조직명</Th>
              <Th>유형</Th>
              <Th>상위 조직</Th>
              <Th>소속 유저 수</Th>
              <Th>하위 조직 수</Th>
            </TableRow>
          </TableHead>
          <TableBody>
            {(!page || page.content.length === 0) && (
              <TableRow>
                <Td colSpan={6} children="결과가 없습니다." />
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
                    <TextLink onClick={`/admin/department-management/${item.id}`}>
                      {item.name}
                    </TextLink>
                  </Td>
                  <Td>
                    {departmentCategoryName(item.category)}
                  </Td>
                  <Td>
                    {item.parent ? item.parent.name : '-'}
                  </Td>
                  <Td>
                    {item.userCount || 0}
                  </Td>
                  <Td>
                    {item.childrenCount || 0}
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