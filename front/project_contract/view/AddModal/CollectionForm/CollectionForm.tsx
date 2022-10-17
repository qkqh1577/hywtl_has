import React, { useContext } from 'react';
import {
  Box,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import Button from 'layouts/Button';
import AddRow from 'project_contract/view/AddModal/CollectionForm/AddRow';
import useDialog from 'components/Dialog';
import { FormikContext } from 'formik';
import Input from 'layouts/Input';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import IconButton from 'layouts/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CollectionForm() {
  const { error } = useDialog();
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const stageList = formik.values.collection && Array.isArray(formik.values.collection.stageList) ? formik.values.collection.stageList : [];
  const totalAmount = formik.values.estimate?.plan?.totalAmount ?? 0;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Th width="10%">
              단계
            </Th>
            <Th width="8%">
              비율(%)
            </Th>
            <Th width="10%">
              금액(원)
            </Th>
            <Th>
              시기
            </Th>
            <Th width="10%">
              예정일
            </Th>
            {edit && (
              <Th width="5%">
                순서
              </Th>
            )}
            {edit && (
              <Th width="5%">
                삭제
              </Th>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {stageList.map((stage,
                          i
          ) => (
            <TableRow key={i}>
              <Td>
                <Input
                  key={stage.name}
                  readOnly={!edit}
                  variant="outlined"
                  defaultValue={stage.name ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (stage.name !== value) {
                      formik.setFieldValue(`collection.stageList.${i}.name`, value);
                    }
                  }}
                />
              </Td>
              <Td>
                <Input
                  key={stage.ratio}
                  readOnly={!edit}
                  type="number"
                  variant="outlined"
                  defaultValue={stage.ratio ?? ''}
                  placeholder="입력"
                  onBlur={(e) => {
                    const value = +(e.target.value) || undefined;
                    if (stage.ratio !== value) {
                      formik.setFieldValue(`collection.stageList.${i}.ratio`, value);
                    }
                  }}
                />
              </Td>
              <Td>
                <Input
                  isAmount
                  readOnly
                  key={stage.ratio}
                  variant="outlined"
                  defaultValue={stage.ratio ? (stage.ratio * totalAmount).toLocaleString() : 0}
                />
              </Td>
              <Td>
                <Input
                  key={stage.note}
                  readOnly={!edit}
                  variant="outlined"
                  defaultValue={stage.note ?? ''}
                  placeholder="입력"
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (stage.note !== value) {
                      formik.setFieldValue(`collection.stageList.${i}.note`, value);
                    }
                  }}
                />
              </Td>
              <Td>
                <DatePicker
                  key={stage.expectedDate}
                  readOnly={!edit}
                  value={stage.expectedDate ? dayjs(stage.expectedDate)
                  .format('YYYY-MM-DD') : null}
                  inputFormat="YYYY-MM-DD"
                  mask="____-__-__"
                  openTo="year"
                  onChange={(e,
                             r
                  ) => {
                    const date = dayjs(e);
                    if (stage.expectedDate !== r) {
                      if (date.isValid() && date.format('YYYY-MM-DD') === r) {
                        formik.setFieldValue(`collection.stageList.${i}.expectedDate`, r);
                      }
                      else {
                        formik.setFieldValue(`collection.stageList.${i}.expectedDate`, undefined);
                      }
                    }
                  }}
                  onAccept={(e) => {
                    if (e === null) {
                      formik.setFieldValue(`collection.stageList.${i}.expectedDate`, undefined);
                    }
                    else {
                      formik.setFieldValue(`collection.stageList.${i}.expectedDate`, dayjs(e)
                      .format('YYYY-MM-DD'));
                    }
                  }}
                  renderInput={(parameter) => (
                    <Input
                      {...parameter.InputProps}
                      inputRef={parameter.inputRef}
                      inputProps={parameter.inputProps}
                      defaultValue={parameter.value}
                      onChange={undefined}
                      onBlur={parameter.onChange}
                    />
                  )}
                />
              </Td>
              {edit && (

                <Td>
                  <Box sx={{
                    display:        'flex',
                    width:          '100%',
                    justifyContent: 'space-between',
                  }}>
                    <IconButton
                      disabled={i === 0}
                      shape="square"
                      tooltip="순서 올리기"
                      children={<FontAwesomeIcon icon="angle-up" />}
                      onClick={() => {
                        const prevList = stageList.filter((p,
                                                           j
                        ) => j !== i);
                        const result: any[] = [];
                        for (let j = 0; j < prevList.length; j++) {
                          if (result.length === i - 1) {
                            result.push(stage);
                          }
                          result.push(prevList[j]);
                        }
                        formik.setFieldValue('collection.stageList', result);
                      }}
                      sx={{
                        marginRight: '10px'
                      }}
                    />
                    <IconButton
                      shape="square"
                      tooltip="순서 내리기"
                      disabled={i === stageList.length - 1}
                      children={<FontAwesomeIcon icon="angle-down" />}
                      onClick={() => {
                        const prevList = stageList.filter((p,
                                                           j
                        ) => j !== i);
                        const result: any[] = [];
                        for (let j = 0; j < prevList.length; j++) {
                          result.push(prevList[j]);
                          if (result.length === i + 1) {
                            result.push(stage);
                          }
                        }
                        formik.setFieldValue('collection.stageList', result);
                      }}
                    />
                  </Box>
                </Td>
              )}
              {edit && (
                <Td>
                  <Button
                    shape="basic3"
                    disabled={stageList.length <= 1}
                    onClick={() => {
                      if (stageList.length === 1) {
                        error('최소 하나 이상의 세부 항목이 필요합니다.');
                        return;
                      }
                      formik.setFieldValue('collection.stageList', stageList.filter((p,
                                                                                     j
                      ) => j !== i));
                    }}>
                    삭제
                  </Button>
                </Td>
              )}
            </TableRow>
          ))}
          {edit && (
            <AddRow />
          )}
          <TableRow>
            <Td>
              합계
            </Td>
            <Td>
              <Input
                readOnly
                type="number"
                key={stageList}
                defaultValue={stageList.map(stage => stage.ratio)
                                       .reduce((a,
                                                b
                                       ) => a + b, 0)}
              />
            </Td>
            <Td>
              <Input
                readOnly
                isAmount
                key={stageList}
                defaultValue={stageList.map(stage => stage.ratio)
                                       .map(ratio => ratio * totalAmount)
                                       .reduce((a,
                                                b
                                       ) => a + b, 0)
                                       .toLocaleString()}
              />
            </Td>
            <Td colSpan={edit ? 4 : 2}>
              <Input
                readOnly={!edit}
                variant="outlined"
                placeholder="입력"
                key={formik.values.collection.totalAmountNote}
                defaultValue={formik.values.collection.totalAmountNote ?? ''}
                onBlur={(e) => {
                  const value = e.target.value || undefined;
                  if (formik.values.collection.totalAmountNote !== value) {
                    formik.setFieldValue('collection.totalAmountNote', value);
                  }
                }}
              />
            </Td>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
    ;
}
