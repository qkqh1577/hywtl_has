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
import TextBox from 'layouts/Text';
import { FormikContext } from 'formik';
import Input from 'layouts/Input';
import Button from 'layouts/Button';
import { ColorPalette } from 'assets/theme';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import AddRow from './CollectionAddRow';
import IconButton from 'layouts/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContractCollectionStage } from 'admin/contract/collection/domain';
import useDialog from 'dialog/hook';

export default function () {
  const { error } = useDialog();
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const collection = formik.values.collection ?? {};
  const stageList = collection.stageList ?? [];

  const plan = formik.values.estimate?.plan ?? {};
  const isLh = formik.values.isLh;
  const totalAmount = useMemo(() => {
    const amount: number = plan.totalAmount || 0;
    if (isLh) {
      return amount;
    }

    return +(amount * 1.1).toFixed(0);
  }, [plan.totalAmount, isLh]);

  const totalRatio = useMemo(() =>
      stageList.map(stage => stage.ratio ?? 0)
               .reduce((a,
                        b
               ) => a + b, 0),
    [stageList]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <Th sx={{ width: '155px' }}>단계</Th>
          <Th sx={{ width: '80px' }}>비율(%)</Th>
          <Th sx={{ width: '110px' }}>금액(원)</Th>
          <Th>시기</Th>
          <Th>
            <Box
              sx={{
                display:        'flex',
                flexWrap:       'wrap',
                justifyContent: 'center',
              }}>
              <TextBox variant="body11" sx={{ width: '100%' }}>예정일</TextBox>
              <TextBox variant="body19">계약서에는 미출력됩니다</TextBox>
            </Box>
          </Th>
          {edit && (<Th>순서</Th>)}
          {edit && (<Th>삭제</Th>)}
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
                variant="outlined"
                readOnly={!edit}
                defaultValue={stage.name ?? ''}
                onBlur={(e) => {
                  if (!edit) {
                    return;
                  }
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
                type="number"
                variant="outlined"
                readOnly={!edit}
                defaultValue={stage.ratio ?? ''}
                onBlur={(e) => {
                  if (!edit) {
                    return;
                  }
                  const value = +(e.target.value) || undefined;
                  if (stage.ratio !== value) {
                    formik.setFieldValue(`collection.stageList.${i}.ratio`, value);
                  }
                }}
              />
            </Td>
            <Td align="right">
              {getAmount(stage.ratio, totalAmount)
              .toLocaleString()}
            </Td>
            <Td>
              <Input
                key={stage.note}
                variant="outlined"
                readOnly={!edit}
                defaultValue={stage.note ?? ''}
                onBlur={(e) => {
                  if (!edit) {
                    return;
                  }
                  const value = +(e.target.value) || undefined;
                  if (stage.note !== value) {
                    formik.setFieldValue(`collection.stageList.${i}.note`, value);
                  }
                }}
              />
            </Td>
            <Td>
              <DatePicker
                openTo="year"
                inputFormat="YYYY-MM-DD"
                mask="____-__-__"
                readOnly={!edit}
                value={stage.expectedDate ? dayjs(stage.expectedDate)
                .format('YYYY-MM-DD') : null}
                onChange={(e) => {
                  if (!edit) {
                    return;
                  }
                  const value = e ? dayjs(e)
                  .format('YYYY-MM-DD') : undefined;
                  const formikValue = stage.expectedDate ? dayjs(stage.expectedDate)
                  .format('YYYY-MM-DD') : undefined;
                  if (formikValue !== value) {
                    formik.setFieldValue(`collection.stageList.${i}.expectedDate`, value);
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
            {edit && (
              <Td>
                <Box sx={{
                  display:        'flex',
                  width:          '100%',
                  justifyContent: 'space-between',
                }}>
                  <IconButton
                    shape="square"
                    tooltip="순서 올리기"
                    disabled={i === 0}
                    children={<FontAwesomeIcon icon="angle-up" />}
                    onClick={() => {
                      const prevList = stageList.filter((t,
                                                         k
                      ) => k !== i);
                      const result: ContractCollectionStage[] = [];
                      for (let k = 0; k < prevList.length; k++) {
                        if (result.length === i - 1) {
                          result.push(stage);
                        }
                        result.push(prevList[k]);
                      }
                      formik.setFieldValue('collection.stageList', result);
                    }}
                    sx={{
                      marginRight: '10px',
                    }}
                  />
                  <IconButton
                    shape="square"
                    tooltip="순서 내리기"
                    disabled={i === stageList.length - 1}
                    children={<FontAwesomeIcon icon="angle-down" />}
                    onClick={() => {
                      const prevList = stageList.filter((t,
                                                         k
                      ) => k !== i);
                      const result: ContractCollectionStage[] = [];
                      for (let k = 0; k < prevList.length; k++) {
                        result.push(prevList[k]);
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
                    formik.setFieldValue('collection.stageList', stageList.filter((detail,
                                                                                   k
                    ) => k !== i));
                  }}>
                  삭제
                </Button>
              </Td>
            )}
          </TableRow>
        ))}
        {edit && (<AddRow stageList={stageList} totalAmount={totalAmount} />)}
        <TableRow>
          <Td>합계</Td>
          <Td sx={{
            color: totalRatio !== 100 ? ColorPalette._eb4c4c : 'inherit',
          }}>
            {totalRatio}
          </Td>
          <Td
            align="right"
            sx={{
              color: totalRatio !== 100 ? ColorPalette._eb4c4c : 'inherit',
            }}>
            {getAmount(totalRatio, totalAmount)
            .toLocaleString()}
          </Td>
          <Td colSpan={edit ? 4 : 2}>
            <Input
              key={collection.totalAmountNote}
              variant="outlined"
              readOnly={!edit}
              defaultValue={collection.totalAmountNote ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
                const value = +(e.target.value) || undefined;
                if (collection.totalAmountNote !== value) {
                  formik.setFieldValue('collection.totalAmountNote', value);
                }
              }}
            />
          </Td>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function getAmount(ratio: number | string | undefined,
                   totalAmount: number | undefined
): number {
  if (!ratio || !totalAmount) {
    return 0;
  }
  const r = (typeof ratio === 'string' ? +ratio : ratio) / 100.0;

  const t = (totalAmount * r).toFixed(0);

  return +t;
}