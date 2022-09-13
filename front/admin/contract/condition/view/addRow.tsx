import React, { useContext } from 'react';
import {
  Td,
  Th
} from 'layouts/Table';
import TextField from 'components/TextField';
import Button from 'layouts/Button';
import { TableRow } from '@mui/material';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { ContractConditionVO } from 'admin/contract/condition/domain';

interface Props {
  index?: number;
  descriptionCount?: number;
}

export default function (props: Props) {
  const formik: FormikContextType<ContractConditionVO> = useContext(FormikContext);
  const onAdd = () => {
    if (props.index === 0 || props.index) {
      formik.setFieldValue(`contractConditionList.${props.index}.descriptionList`, [
        ...formik.values.contractConditionList[props.index].descriptionList, formik.values.contractConditionList[props.index].newDescription
      ]);
      formik.setFieldValue(`contractConditionList.${props.index}.newDescription`, '');
    }
  };
  return (
    <TableRow>
      {props.descriptionCount === 0 && <Th>내용</Th>}
      <Td>
        <TextField
          disableLabel
          name={`contractConditionList.${props.index}.newDescription`}
          label="설명"
          variant="outlined"
        />
      </Td>
      <Td colSpan={2}>
        <Button onClick={onAdd}>
          내용 추가
        </Button>
      </Td>
    </TableRow>
  );
};
