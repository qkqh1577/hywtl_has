import React from 'react';
import { RivalProjectVO } from 'business/domain';
import {
  Button,
  Grid,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import DateFormat from 'components/DateFormat';
import dayjs from 'dayjs';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';

interface Props {
  list: RivalProjectVO[];
  businessName: string;
}

function RivalStatisticTable({ list, businessName }: Props) {

  const count = list.length;
  const minYear = list
  .map((item) => dayjs(item.bidBeginDate)
  .year())
  .reduce((a,
           b
  ) => {
    return a > b ? b : a;
  }, 9999);

  const maxYear = list
  .map((item) => dayjs(item.bidBeginDate)
  .year())
  .reduce((a,
           b
  ) => {
    return a < b ? b : a;
  }, 0);

  const winCount = list
  .map(item => item.win)
  .filter(win => win === '한양풍동실험연구소')
    .length;

  const drawCount = list
  .map(item => item.win)
  .filter(win => win !== '한양풍동실험연구소' && win !== businessName)
    .length;

  const loseCount = list
  .map(item => item.win)
  .filter(win => win === businessName)
    .length;

  const winRate = count > 0 ? (winCount / count * 100).toFixed(1) : 0;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Th>경쟁 현황</Th>
            <Th>전적</Th>
            <Th>승률</Th>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <Td>
              {`${count}회`}
              {count > 0 ? `(최초: ${minYear}, 최근: ${maxYear})` : ''}
            </Td>
            <Td>
              {`${winCount}승 ${drawCount}무 ${loseCount}패`}
            </Td>
            <Td>
              {`${winRate}%`}
            </Td>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function ({ list, businessName }: Props) {

  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <Typography variant="h6">경쟁 현황</Typography>
      </Grid>
      <Grid item sm={12}>
        <RivalStatisticTable list={list} businessName={businessName} />
      </Grid>
      <Grid item sm={12}>
        <Typography variant="h6">경쟁 프로젝트 정보</Typography>
      </Grid>
      <Grid item sm={12}>
        <TableContainer>
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
              {list.length === 0 && (
                <TableRow>
                  <Td colSpan={6}>
                    참여한 프로젝트가 없습니다
                  </Td>
                </TableRow>
              )}
              {list.map((project,
                         no
              ) =>
                (
                  <TableRow key={project.id}>
                    <Td>
                      {no}
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
                      {project.win}
                    </Td>
                    <Td>
                      <Button>새 창으로 상세 보기</Button>
                    </Td>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
