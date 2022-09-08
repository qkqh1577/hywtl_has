import { Td } from 'layouts/Table';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import {
  ContractCollectionStage,
  ContractCollectionVO,
  ExpectedDateType,
  expectedDateTypeList,
  expectedDateTypeName
} from 'admin/contract/collection/domain';
import { TableRow } from '@mui/material';
import React, { useContext, } from 'react';
import Button from 'layouts/Button';
import {
  FormikContext,
  FormikContextType
} from 'formik';


interface Props {
  newName?: string;
  newRatio?: number;
  newNote?: string;
  newExpectedDate?: ExpectedDateType;
}

export default function () {

  const formik: FormikContextType<ContractCollectionVO> = useContext(FormikContext);


  const onAdd = () => {
    const values = formik.values as Props;
    const stage: ContractCollectionStage = {
      name:         values.newName,
      ratio:        +(values.newRatio || 0),
      note:         values.newNote,
      expectedDate: values.newExpectedDate,
    };
    const stageList: ContractCollectionStage[] = formik.values.stageList ?? [];
    formik.setFieldValue('stageList', [...stageList, stage]);
    formik.setFieldValue('newName', '');
    formik.setFieldValue('newRatio', '');
    formik.setFieldValue('newNote', '');
    formik.setFieldValue('newExpectedDate', '');
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
        용역금액 × 비율
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