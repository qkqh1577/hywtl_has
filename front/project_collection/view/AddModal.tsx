import ModalLayout from 'layouts/ModalLayout';
import { DefaultFunction } from 'type/Function';
import { Box } from '@mui/material';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import React, {
  useContext,
  useMemo
} from 'react';
import { FormikContext } from 'formik';
import Button from 'layouts/Button';
import { toAmount } from 'util/NumberUtil';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface Props {
  open: boolean;
  onClose: DefaultFunction;
  totalAmount: number | undefined;
}

export default function ProjectCollectionStageAddModal(props: Props) {

  const formik = useContext(FormikContext);
  const amount: number | undefined = formik.values.amount;
  const totalAmount = props.totalAmount;

  const rate = useMemo(() => {
    if (!amount || !totalAmount) {
      return undefined;
    }
    return amount / totalAmount * 100;
  }, [amount, totalAmount]);

  return (
    <ModalLayout
      open={props.open}
      title="기성단계 추가"
      onClose={props.onClose}
      width="30vw"
      children={
        <Box sx={{
          width:        '100%',
          display:      'flex',
          flexWrap:     'wrap',
          alignContent: 'flex-start',
          '& > div':    {
            width:        '100%',
            marginBottom: '15px',
            paddingRight: '20%',
          }
        }}>
          <Box>
            <DataFieldWithLabel required label="기성명" labelPosition="top">
              <Input
                key={formik.values.name}
                defaultValue={formik.values.name ?? ''}
                onBlur={(e) => {
                  const value = e.target.value || undefined;
                  if (formik.values.name !== value) {
                    formik.setFieldValue('name', value);
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
          <Box>
            <DataFieldWithLabel label="기성 조건" labelPosition="top">
              <Input
                key={formik.values.note}
                defaultValue={formik.values.note ?? ''}
                onBlur={(e) => {
                  const value = e.target.value || undefined;
                  if (formik.values.note !== value) {
                    formik.setFieldValue('note', value);
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
          <Box>
            <DataFieldWithLabel required label="금액" labelPosition="top">
              <Input
                isAmount
                key={amount}
                defaultValue={amount?.toLocaleString() ?? ''}
                onBlur={(e) => {
                  const value = toAmount(e.target.value) || undefined;
                  if (amount !== value) {
                    formik.setFieldValue('amount', value);
                    formik.setFieldValue('rate', rate?.toFixed(1) ?? 0);
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
          <Box>
            <DataFieldWithLabel required label="비율" labelPosition="top">
              <Input
                readOnly
                type="number"
                key={rate}
                defaultValue={rate?.toFixed(1) ?? ''}
              />
            </DataFieldWithLabel>
          </Box>
          <Box>
            <DataFieldWithLabel required label="예정일" labelPosition="top">
              <DatePicker
                openTo="year"
                inputFormat="YYYY-MM-DD"
                mask="____-__-__"
                value={formik.values.expectedDate ? dayjs(formik.values.expectedDate)
                .format('YYYY-MM-DD') : null}
                onChange={(e) => {
                  const value = e ? dayjs(e)
                  .format('YYYY-MM-DD') : undefined;
                  const formikValue = formik.values.expectedDate ? dayjs(formik.values.expectedDate)
                  .format('YYYY-MM-DD') : undefined;
                  if (formikValue !== value) {
                    formik.setFieldValue('expectedDate', value);
                  }
                }}
                renderInput={(parameter) => (
                  <Input
                    {...parameter.InputProps}
                    inputRef={parameter.inputRef}
                    variant="standard"
                    value={parameter.value}
                    inputProps={parameter.inputProps}
                  />
                )}
              />
            </DataFieldWithLabel>
          </Box>
        </Box>
      }
      footer={
        <Box sx={{
          width:          '100%',
          padding:        '10px 0',
          display:        'flex',
          flexWrap:       'nowrap',
          justifyContent: 'center',
          '& > button':   {
            margin: '0 5px',
          }
        }}>
          <Button onClick={() => {formik.handleSubmit();}}>저장</Button>
          <Button shape="basic2" onClick={() => {props.onClose();}}>취소</Button>
        </Box>
      }
    />
  );
}
