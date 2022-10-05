import {
  Box,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import TextBox from 'layouts/Text';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import React from 'react';

interface StatisticProps {
  count: number | undefined;
  minYear: number | undefined;
  maxYear: number | undefined;
  winCount: number | undefined;
  drawCount: number | undefined;
  loseCount: number | undefined;
}

export default function BusinessRivalStatistic(props: StatisticProps) {
  const {
          count,
          minYear,
          maxYear,
          winCount,
          drawCount,
          loseCount,
        } = props;
  const winRate = count && winCount ? (winCount / count * 100).toFixed(1) : undefined;

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
        <TextBox variant="body7">경쟁 현황</TextBox>

      </Box>
      <Box sx={{
        display:  'flex',
        width:    '100%',
        flexWrap: 'nowrap',
      }}>
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
                {count ? `${count}회` : '-'}
                {count && count > 0 ? `(최초: ${minYear}, 최근: ${maxYear})` : ''}
              </Td>
              <Td>
                {count && `${winCount ?? 0}승 ${drawCount ?? 0}무 ${loseCount ?? 0}패`}
              </Td>
              <Td>
                {winRate && `${winRate}%`}
              </Td>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
