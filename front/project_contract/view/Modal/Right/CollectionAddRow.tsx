import { Td } from 'layouts/Table';
import { TableRow } from '@mui/material';
import React, {
  useContext,
  useState,
} from 'react';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';
import Input from 'layouts/Input';
import useDialog from 'dialog/hook';
import { ProjectContractCollectionStageParameter } from 'project_contract/parameter';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { getRateAmount } from 'util/NumberUtil';

interface Props {
  stageList: ProjectContractCollectionStageParameter[];
  totalAmount: number;
}

export default function ({
                           stageList,
                           totalAmount,
                         }: Props) {
  const { error } = useDialog();
  const formik = useContext(FormikContext);
  const [item, setItem] = useState<ProjectContractCollectionStageParameter>({} as ProjectContractCollectionStageParameter);
  const onAdd = () => {
    if (!item.name) {
      error('단계가 필요합니다.');
      return;
    }
    if (!item.rate) {
      error('비율이 필요합니다.');
      return;
    }
    formik.setFieldValue('collection.stageList', [...stageList, item]);
    setItem({} as ProjectContractCollectionStageParameter);
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
              setItem((prevState => ({
                ...prevState,
                name: value
              } as ProjectContractCollectionStageParameter)));
            }
          }}
        />
      </Td>
      <Td>
        <Input
          key={item.rate}
          type="number"
          defaultValue={item.rate ?? ''}
          variant="outlined"
          onBlur={(e) => {
            const value = +(e.target.value) || undefined;
            if (item.rate !== value) {
              setItem((prevState => ({
                ...prevState,
                rate: value
              } as ProjectContractCollectionStageParameter)));
            }
          }}
        />
      </Td>
      <Td align="right">
        {getRateAmount(item.rate, totalAmount)
        .toLocaleString()}
      </Td>
      <Td>
        <Input
          key={item.note}
          defaultValue={item.note ?? ''}
          variant="outlined"
          onBlur={(e) => {
            const value = e.target.value || undefined;
            if (item.note !== value) {
              setItem((prevState => ({
                ...prevState,
                note: value
              } as ProjectContractCollectionStageParameter)));
            }
          }}
        />
      </Td>
      <Td>
        <DatePicker
          openTo="year"
          inputFormat="YYYY-MM-DD"
          mask="____-__-__"
          value={item.expectedDate ? dayjs(item.expectedDate)
          .format('YYYY-MM-DD') : null}
          onChange={(e) => {
            const value = e ? dayjs(e)
            .format('YYYY-MM-DD') : undefined;
            const formikValue = item.expectedDate ? dayjs(item.expectedDate)
            .format('YYYY-MM-DD') : undefined;
            if (formikValue !== value) {
              setItem((prev) => ({
                ...prev,
                expectedDate: value,
              } as ProjectContractCollectionStageParameter));
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
      <Td colSpan={2}>
        <Button onClick={onAdd}>
          기성단계추가
        </Button>
      </Td>
    </TableRow>
  );
}
