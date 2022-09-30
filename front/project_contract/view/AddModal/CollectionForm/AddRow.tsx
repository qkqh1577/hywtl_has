import React from 'react';
import { TableRow } from '@mui/material';
import { Td } from 'layouts/Table';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import {
  ContractCollectionStage,
  ExpectedDateType,
  expectedDateTypeList,
  expectedDateTypeName
} from 'admin/contract/collection/domain';
import Button from 'layouts/Button';
import { ContractCollectionStageWithAmount } from 'project_contract/domain';

interface Props {
  newName?: string;
  newRatio?: number;
  newNote?: string;
  newExpectedDate?: ExpectedDateType;
  newAmount?: number;
}

export default function AddRow({ formik }) {

  const onAdd = () => {
    const values = formik.values as Props;
    const stage: ContractCollectionStageWithAmount = {
      name:         values.newName,
      ratio:        +(values.newRatio || 0),
      note:         values.newNote,
      expectedDate: values.newExpectedDate,
      amount:       values.newAmount,

    };
    const stageList: ContractCollectionStage[] = formik.values.stageList ?? [];
    formik.setFieldValue('stageList', [...stageList, stage]);
    formik.setFieldValue('newName', '');
    formik.setFieldValue('newRatio', '');
    formik.setFieldValue('newNote', '');
    formik.setFieldValue('newExpectedDate', '');
    formik.setFieldValue('newAmount', 0);
  };

  return (
    <TableRow>
      <Td>
        <TextField
          name="newName"
          label="단계"
          disableLabel
          variant="outlined"
          placeholder="입력"
        />
      </Td>
      <Td>
        <TextField
          type="number"
          name="newRatio"
          label="비율"
          disableLabel
          variant="outlined"
          placeholder="입력"
        />
      </Td>
      <Td align="right">
        <TextField
          name={`newAmount`}
          label="용역금액 × 비율"
          disableLabel
          variant="outlined"
        />
      </Td>
      <Td>
        <TextField
          name="newNote"
          label="시기"
          disableLabel
          variant="outlined"
          placeholder="입력"
        />
      </Td>
      <Td>
        <SelectField
          disableLabel
          options={expectedDateTypeList.map(
            (item) => ({
              key:  item as string,
              text: expectedDateTypeName(item)
            })
          )}
          name="newExpectedDate"
          label="예정일 선택"
        />
      </Td>
      <Td colSpan={2}>
        <Button onClick={onAdd}>
          기성단계추가
        </Button>
      </Td>
    </TableRow>
  );
}
