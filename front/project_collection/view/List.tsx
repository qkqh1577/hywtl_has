import Button from 'layouts/Button';
import {
  Box,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import SectionLayout from 'layouts/SectionLayout';
import React, { useMemo } from 'react';
import {
  ProjectCollectionStageId,
  ProjectCollectionVO
} from 'project_collection/domain';
import { DefaultFunction } from 'type/Function';
import UserSelector from 'components/UserSelector';
import { UserId } from 'user/domain';
import DateFormat from 'layouts/DateFormat';
import TextLink from 'layouts/TextLink';
import { cut10000 } from 'util/NumberUtil';
import useDialog from 'dialog/hook';

interface Props {
  totalAmount: number | undefined;
  detail: ProjectCollectionVO | undefined;
  openAddModal: DefaultFunction;
  openDetailModal: DefaultFunction<ProjectCollectionStageId>;
  onUpdate: (userId: UserId | undefined) => void;
}

export default function ProjectCollectionList(props: Props) {
  const { error } = useDialog();
  const stageList = props.detail?.stageList;
  const totalAmount = props.totalAmount;
  const amountBySum = useMemo(() => stageList && stageList.map(stage => stage.amount)
                                           .reduce((prev,
                                                    curr
                                           ) => prev + curr, 0), [stageList]);

  return (
    <SectionLayout
      title="기성 정보"
      titleRightComponent={
        <Button shape="small" onClick={() => {
          if ((totalAmount && amountBySum) && totalAmount <= amountBySum) {
            error('총 기성 비율이 100%를 초과합니다. 기존 기성 비율을 변경하시기 바랍니다.');
            return;
          }
          props.openAddModal();
        }
        }>
          + 기성 추가
        </Button>
      }>
      <Box sx={{
        display:      'flex',
        flexWrap:     'wrap',
        width:        '100%',
        alignContent: 'flex-start',
        flex:         1,
      }}>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '220px',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="담당자">
            <UserSelector
              key={props.detail?.user?.id}
              value={props.detail?.user?.id}
              onChange={(value) => {
                if (props.detail?.user?.id !== value) {
                  props.onUpdate(value);
                }
              }}
            />
          </DataFieldWithLabel>
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
                <Th>예정일</Th>
                <Th>청구일</Th>
                <Th>수금일</Th>
                <Th>수금 비율(%)</Th>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!stageList || !totalAmount) && (
                <TableRow>
                  <Td colSpan={7}>최종 계약서가 필요합니다.</Td>
                </TableRow>
              )}
              {totalAmount && stageList && stageList.length === 0 && (
                <TableRow>
                  <Td colSpan={7}>조회 결과가 없습니다.</Td>
                </TableRow>
              )}
              {totalAmount && stageList?.map(item => (
                <TableRow key={item.id}>
                  <Td>
                    <TextLink onClick={() => {
                      props.openDetailModal(item.id);
                    }}>
                      {item.name}
                    </TextLink>
                  </Td>
                  <Td>{(item.amount / totalAmount * 100).toFixed(1)}</Td>
                  <Td>{cut10000(item.amount)
                  .toLocaleString()}</Td>
                  <Td>
                    <DateFormat date={item.expectedDate} />
                  </Td>
                  <Td>
                    <DateFormat date={item.askedDate} />
                  </Td>
                  <Td>
                    <DateFormat date={item.collectedDate} />
                  </Td>
                  <Td>
                    {item.collectedRate?.toFixed(2)}
                  </Td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </SectionLayout>
  );
}
