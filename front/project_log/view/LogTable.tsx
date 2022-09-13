import React from 'react';
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
import Page from 'type/Page';
import { ProjectLogVO } from 'project_log/domain';

export interface ListProps {
  page: Page<ProjectLogVO> | undefined;
}

export default function LogTable({ page }: ListProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Th>
              일시
            </Th>
            <Th>
              탭명
            </Th>
            <Th>
              섹션명
            </Th>
            <Th>
              항목명
            </Th>
            <Th>
              변경전
            </Th>
            <Th>
              변경후
            </Th>
            <Th>
              ID (이름)
            </Th>
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
            return (
              <TableRow hover role="checkbox" key={i}>
                <Td>
                  {item.date}
                </Td>
                <Td>
                  {item.tabName}
                </Td>
                <Td>
                  {item.sectionName}
                </Td>
                <Td>
                  {item.itemName}
                </Td>
                <Td>
                  {item.before}
                </Td>
                <Td>
                  {item.after}
                </Td>
                <Td>
                  {item.username}({item.name})
                </Td>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
