import React from 'react';
import {
  RivalProjectVO
} from 'business/domain';
import TableCell, { TableCellProps } from 'components/TableCell';
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import DateFormat from 'components/DateFormat';
import dayjs from 'dayjs';

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
            <TableCell>경쟁 현황</TableCell>
            <TableCell>전적</TableCell>
            <TableCell>승률</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              {`${count}회`}
              {count > 0 ? `(최초: ${minYear}, 최근: ${maxYear})` : ''}
            </TableCell>
            <TableCell>
              {`${winCount}승 ${drawCount}무 ${loseCount}패`}
            </TableCell>
            <TableCell>
              {`${winRate}%`}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function ({ list, businessName }: Props) {

  const columnProps: TableCellProps[] = [
    {
      key:      'no',
      children: 'No',
    },
    {
      key:      ' projectCode',
      children: '프로젝트 번호',
    },
    {
      key:      'name',
      children: '프로젝트명',
    },
    {
      key:      'bidDate',
      children: '입찰기간',
    },
    {
      key:      'win',
      children: '낙찰업체',
    },
    {
      key:      'detail',
      children: '상세',
    }];

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
                {columnProps.map((props) =>
                  (<TableCell {...props} />)
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columnProps.length}>
                    참여한 프로젝트가 없습니다
                  </TableCell>
                </TableRow>
              )}
              {list.map((project,
                         no
              ) =>
                (
                  <TableRow key={project.id}>
                    <TableCell>
                      {no}
                    </TableCell>
                    <TableCell>
                      {project.code}
                    </TableCell>
                    <TableCell>
                      {project.name}
                    </TableCell>
                    <TableCell>
                      <DateFormat date={project.bidBeginDate} />
                      ~
                      <DateFormat date={project.bidCloseDate} />
                    </TableCell>
                    <TableCell>
                      {project.win}
                    </TableCell>
                    <TableCell>
                      <Button>새 창으로 상세 보기</Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
