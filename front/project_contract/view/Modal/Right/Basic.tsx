import React, {
  useContext,
  useMemo
} from 'react';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import {
  Box,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import { FormikContext } from 'formik';
import TextBox from 'layouts/Text';
import Input from 'layouts/Input';
import { toAmountKor } from 'util/NumberUtil';
import Collection from './Collection';

export default function () {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const plan = formik.values.estimate?.plan ?? {};
  const basic = formik.values.basic ?? {};
  const collection = formik.values.collection ?? {};
  const isLh = plan.isLh;
  const totalAmount = useMemo(() => {
    return plan.totalAmount || 0;
  }, [plan.totalAmount]);

  return (
    <Table variant="cross">
      <TableHead>
        <TableRow>
          <Th colSpan={2}>풍동 실험 용역 계약서</Th>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <Th sx={{ width: '140px' }}>
            용역명
          </Th>
          <Td>
            <Input
              key={basic.serviceName}
              readOnly={!edit}
              variant="outlined"
              defaultValue={basic.serviceName ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
                const value = e.target.value || undefined;
                if (basic.serviceName !== value) {
                  formik.setFieldValue('basic.serviceName', value);
                }
              }}
            />
          </Td>
        </TableRow>
        <TableRow>
          <Th rowSpan={2}>용역 기간</Th>
          <Td align="left">{basic.serviceDuration}</Td>
        </TableRow>
        <TableRow>
          <Td align="left">
            <Box sx={{
              width:      '100%',
              display:    'flex',
              flexWrap:   'nowrap',
              alignItems: 'center',
            }}>
              구조 설계용 풍하중은
              <Box sx={{ width: '70px', marginLeft: '5px' }}>
                <Input
                  readOnly
                  key={plan.expectedTestDeadline}
                  variant="outlined"
                  defaultValue={plan.expectedTestDeadline ? `${plan.expectedTestDeadline} 주차` : ''}
                />
              </Box>
              , 최종 결과 보고서는
              <Box sx={{ width: '70px', marginLeft: '5px' }}>
                <Input
                  readOnly
                  key={plan.expectedFinalReportDeadline}
                  variant="outlined"
                  defaultValue={plan.expectedFinalReportDeadline ? `${plan.expectedFinalReportDeadline} 주차` : ''}
                />
              </Box>
            </Box>
          </Td>
        </TableRow>
        <TableRow>
          <Th>용역 금액</Th>
          <Td>
            <Input
              readOnly
              key={totalAmount}
              variant="outlined"
              defaultValue={totalAmount > 0 ?
                `${toAmountKor(totalAmount)} (￦${totalAmount.toLocaleString()}), 부가세 ${isLh ? '면세' : '포함'}`
                : ''
              }
            />
          </Td>
        </TableRow>
        <TableRow>
          <Th>기성 단계</Th>
          <Td align="left">
            <Box sx={{
              width:        '100%',
              display:      'flex',
              flexWrap:     'wrap',
              alignContent: 'flex-start',
            }}>
              <Box sx={{ width: '100%', padding: '10px 0' }}>
                <TextBox variant="body11">{collection.stageNote}</TextBox>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Collection />
              </Box>
            </Box>
          </Td>
        </TableRow>
        <TableRow>
          <Th>성과품</Th>
          <Td align="left">
            <Input
              readOnly={!edit}
              variant="outlined"
              key={basic.outcome}
              defaultValue={basic.outcome ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
                const value = e.target.value || undefined;
                if (basic.outcome !== value) {
                  formik.setFieldValue('basic.outcome', value);
                }
              }}
            />
          </Td>
        </TableRow>
      </TableBody>
    </Table>
  );
}
