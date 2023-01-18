import React, {
  useContext,
  useState
} from 'react';
import { TableRow } from '@mui/material';
import { Td } from 'layouts/Table';
import Input from 'layouts/Input';
import { ProjectContractCollectionStageParameter } from 'project_contract/parameter';
import { getRateAmount } from 'util/NumberUtil';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Button from 'layouts/Button';
import useDialog from 'dialog/hook';
import { FormikContext } from 'formik';

interface Props {
  stageList: ProjectContractCollectionStageParameter[];
  totalAmount: number;
}

export default function AddStage({
                                             stageList,
                                             totalAmount,
                                           }: Props) {
  const { error } = useDialog();
  const formik = useContext(FormikContext);
  const [item, setItem] = useState<ProjectContractCollectionStageParameter>({} as ProjectContractCollectionStageParameter);
  const onAdd = () => {
    if (!item.name) {
      error('기성 단계 단계가 필수값 입니다.');
      return;
    }
    if (!item.rate) {
      error('기성 단계 비율이 필수값 입니다.');
      return;
    }

    if (!item.expectedDate) {
      error('기성 단계 예정일은 필수값 입니다.');
      return;
    }

    formik.setFieldValue('stageList', [...stageList, item]);
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
                rate:   value,
                amount: getRateAmount(value, totalAmount)
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
