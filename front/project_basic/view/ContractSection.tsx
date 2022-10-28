import SectionLayout from 'layouts/SectionLayout';
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
import { ProjectContractVO } from 'project_contract/domain';
import DateFormat from 'layouts/DateFormat';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import dayjs from 'dayjs';
import { ProjectEstimateVO } from 'project_estimate/domain';

interface Props {
  detail: ProjectContractVO | undefined;
}

export default function ProjectBasicContractSection({ detail }: Props) {
  const estimate = detail?.estimate ?? {} as ProjectEstimateVO;

  return (
    <SectionLayout title="최종 계약 정보">
      <Box sx={{
        width:    '100%',
        display:  'flex',
        flexWrap: 'wrap',
      }}>
        <Box sx={{
          width:        '100%',
          display:      'flex',
          flexWrap:     'nowrap',
          alignItems:   'center',
          marginBottom: '10px',
        }}>
          <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
            <DataFieldWithLabel label="계약 일자">
              <Input
                readOnly
                key={detail?.basic?.contractDate ? dayjs(detail.basic.contractDate)
                .format('YYYY-MM-DD') : undefined}
                defaultValue={detail?.basic?.contractDate ? dayjs(detail?.basic?.contractDate)
                .format('YYYY-MM-DD') : ''}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
            <DataFieldWithLabel label="계약 번호">
              <Input
                readOnly
                key={detail?.code}
                defaultValue={detail?.code ?? ''}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
            <DataFieldWithLabel label="풍동 금액">
              <Input
                readOnly
                isAmount
                key={estimate?.plan?.testAmount}
                defaultValue={estimate?.plan?.testAmount?.toLocaleString() ?? ''}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
            <DataFieldWithLabel label="구검">
              <Input
                readOnly
                isAmount
                key={estimate?.plan?.reviewAmount}
                defaultValue={estimate?.plan?.reviewAmount?.toLocaleString() ?? ''}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
            <DataFieldWithLabel label="총액">
              <Input
                readOnly
                isAmount
                key={estimate?.plan?.totalAmount}
                defaultValue={estimate?.plan?.totalAmount?.toLocaleString() ?? ''}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
            <DataFieldWithLabel label="일정">
              <Input
                readOnly
                key={`${estimate?.plan?.expectedTestDeadline ?? '-'}주/${estimate?.plan?.expectedFinalReportDeadline ?? '-'}주`}
                defaultValue={`${estimate?.plan?.expectedTestDeadline ?? '-'}주/${estimate?.plan?.expectedFinalReportDeadline ?? '-'}주`}
              />
            </DataFieldWithLabel>
          </Box>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <Th>기성</Th>
              <Th>기성비율(%)</Th>
              <Th>기성조건</Th>
              <Th>일자</Th>
            </TableRow>
          </TableHead>
          <TableBody>
            {detail?.collection?.stageList?.map((item,
                                                 i
            ) => (
              <TableRow key={i}>
                <Td>{item.name}</Td>
                <Td>{item.rate}</Td>
                <Td>{item.note}</Td>
                <Td>
                  <DateFormat date={item.expectedDate} />
                </Td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </SectionLayout>
  );
}
