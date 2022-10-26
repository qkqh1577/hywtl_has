import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import {
  projectCollectionStageStatusTypeList,
  projectCollectionStageStatusTypeName,
} from 'project_collection/domain';
import Button from 'layouts/Button';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import {
  Box,
  MenuItem,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import Input from 'layouts/Input';
import Select from 'layouts/Select';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { toAmount } from 'util/NumberUtil';
import TextBox from 'layouts/Text';

export default function () {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const statusList = formik.values.statusList ?? [];

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
          <TextBox variant="body7" sx={{ marginRight: '20px' }}>수금 현황</TextBox>
        </Box>
        <Box sx={{
          display:        'flex',
          flexWrap:       'nowrap',
          justifyContent: 'flex-end',
          alignItems:     'center',
        }}>
          {edit && (
            <Button shape="small" onClick={() => {
              formik.setFieldValue('statusList', [...statusList, {}]);
            }}>
              등록
            </Button>
          )}
        </Box>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <Th>유형</Th>
            <Th>일자</Th>
            <Th>금액</Th>
            <Th>비고</Th>
            {edit && (<Th>삭제</Th>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {!edit && statusList.length === 0 && (
            <TableRow>
              <Td colSpan={4}>조회 결과가 없습니다.</Td>
            </TableRow>
          )}
          {statusList.map((item,
                           i
          ) => (
            <TableRow key={i}>
              <Td>
                <Select
                  variant="outlined"
                  key={item.type}
                  readOnly={!edit}
                  value={item.type ?? ''}
                  onChange={(e) => {
                    if (!edit) {
                      return;
                    }
                    const value = e.target.value || undefined;
                    if (item.type !== value) {
                      formik.setFieldValue(`statusList.${i}.type`, value);
                    }
                  }}>
                  {projectCollectionStageStatusTypeList.map(type => (
                    <MenuItem key={type} value={type}>
                      {projectCollectionStageStatusTypeName(type)}
                    </MenuItem>
                  ))}
                </Select>
              </Td>
              <Td>
                <DatePicker
                  openTo="year"
                  inputFormat="YYYY-MM-DD"
                  mask="____-__-__"
                  readOnly={!edit}
                  value={item.requestedDate ? dayjs(item.requestedDate)
                  .format('YYYY-MM-DD') : null}
                  onChange={(e) => {
                    if (!edit) {
                      return;
                    }
                    const value = e ? dayjs(e)
                    .format('YYYY-MM-DD') : undefined;
                    const formikValue = item.requestedDate ? dayjs(item.requestedDate)
                    .format('YYYY-MM-DD') : undefined;
                    if (formikValue !== value) {
                      formik.setFieldValue(`statusList.${i}.requestedDate`, value);
                    }
                  }}
                  renderInput={(parameter) => (
                    <Input
                      {...parameter.InputProps}
                      inputRef={parameter.inputRef}
                      variant="outlined"
                      value={parameter.value}
                      inputProps={parameter.inputProps}
                    />
                  )}
                />
              </Td>
              <Td>
                <Input
                  isAmount
                  variant="outlined"
                  readOnly={!edit}
                  key={item.amount}
                  defaultValue={item.amount?.toLocaleString() ?? ''}
                  onBlur={(e) => {
                    if (!edit) {
                      return;
                    }
                    const value = toAmount(e.target.value) || undefined;
                    if (item.amount !== value) {
                      formik.setFieldValue(`statusList.${i}.amount`, value);
                    }
                  }}
                />
              </Td>
              <Td>
                <Input
                  variant="outlined"
                  readOnly={!edit}
                  key={item.note}
                  defaultValue={item.note ?? ''}
                  onBlur={(e) => {
                    if (!edit) {
                      return;
                    }
                    const value = e.target.value || undefined;
                    if (item.note !== value) {
                      formik.setFieldValue(`statusList.${i}.note`, value);
                    }
                  }}
                />
              </Td>
              {edit && (
                <Td>
                  <Button
                    shape="small3"
                    onClick={() => {
                      if (!statusList || statusList.length === 0) {
                        formik.setFieldValue('statusList', []);
                      }
                      else {
                        formik.setFieldValue('statusList', statusList.filter((item,
                                                                              j
                        ) => j !== i));
                      }
                    }}>
                    삭제
                  </Button>
                </Td>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>

  );
}