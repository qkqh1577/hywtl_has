import React from 'react';
import {
  Box,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import SectionLayout from 'layouts/SectionLayout';
import Button from 'layouts/Button';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import TextBox from 'layouts/Text';

export default function ProjectProgress() {

  return (
    <Box sx={{
      width: '100%',
    }}>
      <TextBox variant="body11">(개발 중인 화면입니다)</TextBox>
      <SectionLayout
        title="기성 정보"
        titleRightComponent={
          <Button shape="small">
            + 기성 추가
          </Button>
        }
        children={
          <Box sx={{
            display:      'flex',
            flexWrap:     'wrap',
            width:        '100%',
            alignContent: 'flex-start',
            flex:         1,
          }}>
            <Box sx={{
              display:  'flex',
              flexWrap: 'nowrap',
              width:    '100%',
            }}>
              <DataFieldWithLabel
                required
                label="담당자"
                children="김프로"
              />
            </Box>
            <Box sx={{
              display:  'flex',
              flexWrap: 'nowrap',
              width:    '100%',
            }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <Th>기성명</Th>
                    <Th>비율(%)</Th>
                    <Th>금액(만 원)</Th>
                    <Th>기성 조건</Th>
                    <Th>예정일</Th>
                    <Th>청구일</Th>
                    <Th>변경 예정일</Th>
                    <Th>이월 사유</Th>
                    <Th>수금일</Th>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <Td>계약금</Td>
                    <Td>30</Td>
                    <Td>4,950</Td>
                    <Td>계약 체결 시</Td>
                    <Td>2022-11-01</Td>
                    <Td />
                    <Td />
                    <Td />
                    <Td />
                  </TableRow>
                  <TableRow>
                    <Td>중도금</Td>
                    <Td>30</Td>
                    <Td>4,950</Td>
                    <Td>검수 시</Td>
                    <Td>2022-12-01</Td>
                    <Td />
                    <Td />
                    <Td />
                    <Td />
                  </TableRow>
                  <TableRow>
                    <Td>잔금</Td>
                    <Td>40</Td>
                    <Td>6,600</Td>
                    <Td>최종 보고서 인도 시</Td>
                    <Td>2022-12-21</Td>
                    <Td />
                    <Td />
                    <Td />
                    <Td />
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Box>
        }
      />
      <SectionLayout
        title="프로젝트 진행 정보"
        children={
          <TextBox variant="body11">기획중</TextBox>
        }
      />
      <SectionLayout
        title="대지모형 진행 정보"
        children={
          <TextBox variant="body11">기획중</TextBox>
        }
      />
      <SectionLayout
        title="동별 진행 정보"
        children={
          <TextBox variant="body11">기획중</TextBox>
        }
      />
    </Box>
  );
}