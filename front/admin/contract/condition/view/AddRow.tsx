import React, {
  useContext,
  useState
} from 'react';
import {
  Td,
  Th
} from 'layouts/Table';
import Button from 'layouts/Button';
import { TableRow } from '@mui/material';
import { FormikContext } from 'formik';
import Input from 'layouts/Input';

interface Props {
  index: number;
}

export default function (props: Props) {
  const formik = useContext(FormikContext);
  const descriptionList = Array.isArray(formik.values.contractConditionList)
    ? (formik.values.contractConditionList[props.index] ?? { descriptionList: [] }).descriptionList
    : [];
  const [description, setDescription] = useState<string>();


  const onAdd = () => {
    formik.setFieldValue(`contractConditionList.${props.index}.descriptionList`, [...descriptionList, description]);
    setDescription(undefined);
  };

  return (
    <TableRow>
      {descriptionList.length === 0 && <Th>내용</Th>}
      <Td>
        <Input
          variant="outlined"
          value={description ?? ''}
          onChange={(e) => {
            const value = e.target.value as string;
            if (description !== value) {
              setDescription(value);
            }
          }}
        />
      </Td>
      <Td colSpan={descriptionList.length === 0 ? 1 : 2} sx={{ width: '200px' }}>
        <Button onClick={onAdd}>
          내용 추가
        </Button>
      </Td>
    </TableRow>
  );
};
