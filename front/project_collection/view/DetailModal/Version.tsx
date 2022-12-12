import {
  Box,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import React from 'react';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import dayjs from 'dayjs';
import DateFormat from 'layouts/DateFormat';
import TextBox from 'layouts/Text';
import {
  ProjectCollectionStageStatusVO,
  ProjectCollectionStageVersionVO
} from 'project_collection/domain';
import TextLink from 'layouts/TextLink';
import { DefaultFunction } from 'type/Function';

interface Props {
  totalAmount: number | undefined;
  versionList: ProjectCollectionStageVersionVO[] | undefined;
  onOpenStageStatusModal: DefaultFunction<ProjectCollectionStageStatusVO[]>;
}

export default function (props: Props) {

  const versionList = props.versionList ?? [];

  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'wrap',
      width:    '100%',
    }}>
      <Box sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        width:          '100%',
        justifyContent: 'space-between',
        alignItems:     'center',
        marginBottom:   '10px',
      }}>
        <Box sx={{
          display:    'flex',
          flexWrap:   'nowrap',
          alignItems: 'center',
        }}>
          <TextBox variant="body7" sx={{ marginRight: '20px' }}>기본 정보 이력</TextBox>
        </Box>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <Th>일자</Th>
            <Th>기성명</Th>
            <Th>금액</Th>
            <Th>비율(%)</Th>
            <Th>예정일</Th>
            <Th>기성 조건</Th>
            <Th>비고</Th>
          </TableRow>
        </TableHead>
        <TableBody>
          {versionList.length === 0 && (
            <TableRow>
              <Td colSpan={7}>조회 결과가 없습니다</Td>
            </TableRow>
          )}
          {versionList.map((item,
                            index
          ) => {
            const rate: number | undefined = props.totalAmount ? (item.amount / props.totalAmount * 100) : undefined;
            const modifiedAt = dayjs(item.modifiedAt)
            .format('YYYY-MM-DD HH:mm:ss');
            return (
              <TableRow key={`${modifiedAt}_${index}`}>
                <Td>
                  <DateFormat date={item.modifiedAt} format="YYYY-MM-DD HH:mm" />
                </Td>
                <Td>
                  <TextLink onClick={() => {
                    props.onOpenStageStatusModal(item.statusList);
                  }}>
                    {item.name}
                  </TextLink>
                </Td>
                <Td align="right">{item.amount.toLocaleString()}</Td>
                <Td>{rate?.toFixed(1)}</Td>
                <Td>
                  <DateFormat date={item.expectedDate} />
                </Td>
                <Td>{item.note}</Td>
                <Td>{item.reason}</Td>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}
