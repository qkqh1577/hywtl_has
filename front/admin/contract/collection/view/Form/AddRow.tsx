import { Td } from 'layouts/Table';
import {
  ContractCollectionStage,
  ExpectedDateType,
  expectedDateTypeList,
  expectedDateTypeName
} from 'admin/contract/collection/domain';
import {
  MenuItem,
  TableRow
} from '@mui/material';
import React, {
  useContext,
  useState,
} from 'react';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';
import Input from 'layouts/Input';
import Select from 'layouts/Select';
import useDialog from 'components/Dialog';

export default function () {
  const { error } = useDialog();
  const formik = useContext(FormikContext);
  const [item, setItem] = useState<ContractCollectionStage>({});
  const onAdd = () => {
    if (!item.name) {
      error('단계가 필요합니다.');
      return;
    }
    if (!item.ratio) {
      error('비율이 필요합니다.');
      return;
    }
    const stageList: ContractCollectionStage[] = formik.values.stageList ?? [];
    formik.setFieldValue('stageList', [...stageList, item]);
    setItem({});
  };

  return (
    <TableRow>
      <Td>
        <Input
          key={item.name}
          defaultValue={item.name ?? ''}
          variant="outlined"
          onBlur={(e) => {
            const value = e.target.value || undefined;
            if (item.name !== value) {
              setItem((prevState => ({ ...prevState, name: value })));
            }
          }}
        />
      </Td>
      <Td>
        <Input
          key={item.ratio}
          type="number"
          defaultValue={item.ratio ?? ''}
          variant="outlined"
          onBlur={(e) => {
            const value = +(e.target.value) || undefined;
            if (item.ratio !== value) {
              setItem((prevState => ({ ...prevState, ratio: value })));
            }
          }}
        />
      </Td>
      <Td align="right">
        용역금액 × 비율
      </Td>
      <Td>
        <Input
          key={item.note}
          defaultValue={item.note ?? ''}
          variant="outlined"
          onBlur={(e) => {
            const value = e.target.value || undefined;
            if (item.note !== value) {
              setItem((prevState => ({ ...prevState, note: value })));
            }
          }}
        />
      </Td>
      <Td>
        <Select
          displayEmpty
          value={item.expectedDate ?? ''}
          variant="outlined"
          onChange={(e) => {
            const value = e.target.value as ExpectedDateType || undefined;
            if (item.expectedDate !== value) {
              setItem((prevState => ({ ...prevState, expectedDate: value })));
            }
          }}>
          <MenuItem value="">선택</MenuItem>
          {expectedDateTypeList.map((type) => (
              <MenuItem key={type} value={type}>
                {expectedDateTypeName(type)}
              </MenuItem>
            )
          )}
        </Select>
      </Td>
      <Td colSpan={2}>
        <Button onClick={onAdd}>
          기성단계추가
        </Button>
      </Td>
    </TableRow>
  );
}