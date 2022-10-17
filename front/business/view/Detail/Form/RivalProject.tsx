import React from 'react';
import {
  Box,
  TableBody,
  TableHead,
  TableRow,
} from '@mui/material';
import DateFormat from 'layouts/DateFormat';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import TextBox from 'layouts/Text';
import { RivalProjectVO } from 'business/domain';
import Button from 'layouts/Button';

interface Props {
  list: RivalProjectVO[] | undefined;
}

export default function BusinessRivalProjectListSection(props: Props) {
  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'wrap',
      width:    '100%',
      margin:   '10px 0px',
      padding:  '10px',
    }}>

      <Box sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        width:          '100%',
        justifyContent: 'space-between',
        alignItems:     'center',
        marginBottom:   '10px',
      }}>
        <TextBox variant="body7">경쟁 프로젝트 정보</TextBox>
      </Box>
      <Box sx={{
        display:  'flex',
        width:    '100%',
        flexWrap: 'nowrap',
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <Th>No.</Th>
              <Th>프로젝트 번호</Th>
              <Th>프로젝트명</Th>
              <Th>입찰기간</Th>
              <Th>낙찰업체</Th>
              <Th>상세</Th>
            </TableRow>
          </TableHead>
          <TableBody>
            {(!props.list || props.list.length === 0) && (
              <TableRow>
                <Td colSpan={6}>
                  참여한 프로젝트가 없습니다
                </Td>
              </TableRow>
            )}
            {props.list && props.list.map((project,
                                           i
            ) =>
              (
                <TableRow key={project.id}>
                  <Td>
                    {i + 1}
                  </Td>
                  <Td>
                    {project.code}
                  </Td>
                  <Td>
                    {project.name}
                  </Td>
                  <Td>
                    <DateFormat date={project.bidBeginDate} />
                    ~
                    <DateFormat date={project.bidCloseDate} />
                  </Td>
                  <Td>
                    {project.win.name}
                  </Td>
                  <Td>
                    <Button shape="small">새 창으로 상세 보기</Button>
                  </Td>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
